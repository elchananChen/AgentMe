import { tool } from 'ai';
import { z } from 'zod';
import { githubLib } from '../lib/github';

export const githubTools = {
  // Tool for scanning project structure
  getProjectStructure: tool({
    description: 'Explore the file structure of Elchanan’s repository to understand the architecture.',
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().describe('The owner of the repository'),
    }),
    execute: async ({ owner, repo }) => {
      const tree = await githubLib.getRepoStructure(owner, repo);
      return tree.map((f: any) => f.path);
    },
  }),

  // Tool for reading file content
  getFileCode: tool({
    description: 'Read the actual source code of a file to explain its logic or implementation.',
    inputSchema: z.object({
      repo: z.string().describe('The name of the repository'),
      owner: z.string().describe('The owner of the repository'),
      path: z.string().describe('The full path to the file'),
    }),
    execute: async ({ owner, repo, path }) => {
      return await githubLib.getFileContent(owner, repo, path);
    },
  }),
};