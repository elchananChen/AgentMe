import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const githubLib = {
  async getRepoStructure(owner: string, repo: string) {
    const { data } = await octokit.git.getTree({
      owner, repo, tree_sha: "main", recursive: "true",
    });
    return data.tree;
  },
  async getFileContent(owner: string, repo: string, path: string) {
    const { data } = await octokit.repos.getContent({
      owner, repo, path,
      headers: { accept: "application/vnd.github.v3.raw" },
    });
    return data as unknown as string;
  }
};