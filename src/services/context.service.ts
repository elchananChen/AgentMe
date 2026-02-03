import { readFileContent} from '../lib/contextLoader';
import path from 'path';

export async function loadContext(): Promise<string> {
  const KNOWLEDGE_BASE = path.join(process.cwd(), 'knowladge');
  const profile = await readFileContent(path.join(KNOWLEDGE_BASE, 'cv.md'));
  return profile;
}