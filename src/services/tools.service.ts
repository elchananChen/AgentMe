import { tool } from 'ai';
import { z } from 'zod';
import { githubLib } from '../lib/github';
import {ToolSet} from 'ai';

export const githubTools = {
  // Tool for scanning project structure
  getProjectStructure: tool({
    description: 'Explore the file structure of Elchanan’s repository to understand the architecture.',
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().default('ElchananChen').describe('The owner of the repository'),
    }),
    execute: async ({ owner, repo }) => {
      console.log(`🔍 Tool: getProjectStructure called for ${owner}/${repo}`);
      try {
        const tree = await githubLib.getRepoStructure(owner, repo);
        const filteredPaths = tree
          .map((f: any) => f.path)
          .filter((path: string) => !path.includes('node_modules/') && !path.startsWith('.git/') && !path.startsWith('dist/') && !path.startsWith('build/') && !path.startsWith('.next/'));
        
        console.log(`✅ Tool: getProjectStructure found ${filteredPaths.length} files (filtered from ${tree.length})`);
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
};