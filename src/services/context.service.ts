import { readFileContent} from '../lib/contextLoader';
import path from 'path';

export async function loadContext(): Promise<string> {
  const KNOWLEDGE_BASE = path.join(process.cwd(), 'knowledge');
  
  const cvPath = path.join(KNOWLEDGE_BASE, 'cv.md');
  const reposPath = path.join(KNOWLEDGE_BASE, 'repositories.md');

  let context = '';

  try {
    context += await readFileContent(cvPath);
    context += '\n\n---\n\n';
  } catch (e) {
    console.warn('cv.md not found');
  }

  try {
    const repos = await readFileContent(reposPath);
    context += '## Available Repositories\n';
    context += repos;
  } catch (e) {
    console.warn('repositories.md not found. Running sync might be needed.');
  }

  return context;
}