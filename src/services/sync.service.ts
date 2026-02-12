import { githubLib } from '../lib/github';
import fs from 'fs/promises';
import path from 'path';

export class SyncService {
  private static KNOWLEDGE_BASE = path.join(process.cwd(), 'knowledge');
  private static REPOS_FILE = path.join(this.KNOWLEDGE_BASE, 'repositories.md');

  static async syncRepos() {
    try {
      console.log('🔄 Syncing repositories from GitHub...');
      const repos = await githubLib.getUserRepos();
      
      const content = [
        '# Elchanan Chen - GitHub Repositories',
        '',
        'This is a list of Elchanan’s public repositories. Use these names when calling tools to explore specific projects.',
        '',
        ...repos.map(repo => `- **${repo.name}**: ${repo.description || 'No description provided.'}`)
      ].join('\n');

      // Ensure directory exists
      await fs.mkdir(this.KNOWLEDGE_BASE, { recursive: true });
      
      await fs.writeFile(this.REPOS_FILE, content, 'utf-8');
      console.log(`✅ Repositories synced successfully to ${this.REPOS_FILE}`);
    } catch (error) {
      console.error('❌ Failed to sync repositories:', error);
    }
  }
}
