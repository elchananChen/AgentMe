import { tool } from 'ai';
import { z } from 'zod';
import { githubLib } from '../lib/github';

// Cache to store repository structures to avoid 404s and redundant API calls
const repoCache: Record<string, Set<string>> = {};

const getRepoKey = (owner: string, repo: string) => `${owner}/${repo}`;

export const githubTools = {
  // Tool for checking GitHub rate limit
  getRateLimit: tool({
    description: 'Check the current GitHub API rate limit status.',
    inputSchema: z.object({}),
    execute: async () => {
      console.log(`🔍 Tool: getRateLimit called`);
      try {
        const rateLimit = await githubLib.getRateLimit();
        const core = rateLimit.resources.core;
        const resetAt = new Date(core.reset * 1000).toLocaleString();
        const info = `GitHub Rate Limit: ${core.remaining}/${core.limit}. Resets at: ${resetAt}`;
        console.log(`✅ Tool: getRateLimit status: ${info}`);
        return info;
      } catch (error: any) {
        console.error(`❌ Tool: getRateLimit failed:`, error.message);
        return `ERROR: Failed to fetch GitHub rate limit. ${error.message}`;
      }
    },
  }),

  // Tool for scanning project structure
  getProjectStructure: tool({
    description: 'Explore the file structure of Elchanan’s repository to understand the architecture.',
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().default('ElchananChen').describe('The owner of the repository'),
    }),
    execute: async ({ owner, repo }) => {
      console.log(`🔍 Tool: getProjectStructure called for ${owner}/${repo}`);
      const repoKey = getRepoKey(owner, repo);
      try {
        const rateLimit = await githubLib.getRateLimit();
        console.log(`📊 Tool: GitHub Core Rate Limit before structure scan: ${rateLimit.resources.core.remaining}/${rateLimit.resources.core.limit}`);
        const tree = await githubLib.getRepoStructure(owner, repo);
        const filteredPaths = tree
          .map((f: any) => f.path)
          .filter((path: string) => !path.includes('node_modules/') && !path.startsWith('.git/') && !path.startsWith('dist/') && !path.startsWith('build/') && !path.startsWith('.next/'));
        
        
        console.log(`✅ Tool: getProjectStructure found ${filteredPaths.length} files (filtered from ${tree.length})`);
        
        // Cache the full tree paths for validation
        repoCache[repoKey] = new Set(tree.map((f: any) => f.path));
        
        return filteredPaths;
      } catch (error: any) {
        console.error(`❌ Tool: getProjectStructure failed:`, error.message);
        return `ERROR: Failed to fetch repository structure. GitHub API reported: ${error.message}. Please check if the repository exists or if API rate limits are exceeded.`;
      }
    },
  }),

  // Tool for reading file content
  getFileCode: tool({
    description: 'Read the actual source code of a file to explain its logic or implementation.',
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().default('ElchananChen').describe('The owner of the repository'),
      path: z.string().describe('The full path to the file'),
    }),
    execute: async ({ owner, repo, path }) => {
      console.log(`🔍 Tool: getFileCode called for ${owner}/${repo}/${path}`);
      const repoKey = getRepoKey(owner, repo);
      
      // Local Validation
      if (repoCache[repoKey] && !repoCache[repoKey].has(path)) {
        console.warn(`🛑 Tool: getFileCode path validation failed for ${path}. File does not exist in cached structure.`);
        return `ERROR: File "${path}" does not exist in the repository structure. Please check the project structure before requesting files.`;
      }

      try {
        const content = await githubLib.getFileContent(owner, repo, path);
        console.log(`✅ Tool: getFileCode read ${content.length} characters`);
        return content;
      } catch (error: any) {
        console.error(`❌ Tool: getFileCode failed for ${path}:`, error.message);
        return `ERROR: Failed to read file content at "${path}". GitHub API reported: ${error.message}.`;
      }
    },
  }),

  // Tool for reading multiple files content
  getFilesCode: tool({
    description: `Read the actual source code of multiple files at once. 
      Efficiency First: Batch request as many related files as possible (up to 50) to build a complete mental model quickly.
      Group related files (e.g., all models, or all controllers in a module) rather than reading one-by-one.`,
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().default('ElchananChen').describe('The owner of the repository'),
      paths: z.array(z.string()).describe('The full paths to the files'),
    }),
    execute: async ({ owner, repo, paths }) => {
      console.log(`🔍 Tool: getFilesCode called for ${owner}/${repo} with ${paths.length} files`);
      const repoKey = getRepoKey(owner, repo);
      const cache = repoCache[repoKey];

      try {
        const results = await Promise.allSettled(
          paths.map(async (path) => {
            // Local Validation
            if (cache && !cache.has(path)) {
              console.warn(`🛑 Tool: getFilesCode path validation failed for ${path}`);
              throw new Error(`File "${path}" does not exist in repository structure.`);
            }
            const content = await githubLib.getFileContent(owner, repo, path);
            return { path, content };
          })
        );

        let combinedContent = '';
        results.forEach((result, index) => {
          const path = paths[index];
          if (result.status === 'fulfilled') {
            combinedContent += `--- FILE: ${path} ---\n${result.value.content}\n\n`;
          } else {
            console.error(`❌ Tool: getFilesCode failed for ${path}:`, result.reason.message);
            combinedContent += `--- FILE: ${path} ---\nERROR: Failed to read file content. GitHub API reported: ${result.reason.message}\n\n`;
          }
        });

        console.log(`✅ Tool: getFilesCode completed for ${paths.length} files`);
        return combinedContent;
      } catch (error: any) {
        console.error(`❌ Tool: getFilesCode failed:`, error.message);
        return `ERROR: Failed to process multiple files. ${error.message}`;
      }
    },
  }),
};