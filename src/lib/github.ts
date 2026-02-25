import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
dotenv.config();
const octokit = new Octokit({ 
  auth: process.env.GITHUB_TOKEN,
  request: {
    timeout: 30000, // 30 seconds
  }
});

export const githubLib = {
  async getRateLimit() {
    console.log(`📡 GitHub: Fetching rate limit status...`);
    try {
      const { data } = await octokit.rateLimit.get();
      console.log(`✅ GitHub: Rate limit fetched. Core: ${data.resources.core.remaining}/${data.resources.core.limit}`);
      return data;
    } catch (error) {
      console.error(`❌ GitHub: Error in getRateLimit:`, error);
      throw error;
    }
  },
  async getRepoStructure(owner: string, repo: string) {
    console.log(`📡 GitHub: Fetching repository info for ${owner}/${repo}`);
    try {
      const rateLimitBefore = await octokit.rateLimit.get();
      console.log(`📊 GitHub: Rate limit before getRepoStructure: ${rateLimitBefore.data.resources.core.remaining}`);
      const { data: repoData } = await octokit.repos.get({ owner, repo });
      const defaultBranch = repoData.default_branch;
      console.log(`📡 GitHub: Default branch for ${repo} is ${defaultBranch}`);

      const { data } = await octokit.git.getTree({
        owner, repo, tree_sha: defaultBranch, recursive: "true",
      });
      return data.tree;
    } catch (error) {
      console.error(`❌ GitHub: Error in getRepoStructure for ${repo}:`, error);
      throw error;
    }
  },
  async getFileContent(owner: string, repo: string, path: string) {
    console.log(`📡 GitHub: Fetching file content for ${owner}/${repo}/${path}`);
    try {
      const { data } = await octokit.repos.getContent({
        owner, repo, path,
        headers: { accept: "application/vnd.github.v3.raw" },
      });
      return data as unknown as string;
    } catch (error) {
      console.error(`❌ GitHub: Error in getFileContent for ${path}:`, error);
      throw error;
    }
  },
  async getUserRepos(username: string = 'ElchananChen') {
    console.log(`📡 GitHub: Fetching repos for user ${username}`);
    try {
      const { data } = await octokit.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 100,
      });
      return data;
    } catch (error) {
      console.error(`❌ GitHub: Error in getUserRepos:`, error);
      throw error;
    }
  }
};