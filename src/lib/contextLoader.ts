import fs from 'fs/promises';
import path from 'path';

// generic function for single file reading
export async function readFileContent(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

// generic function for reading directory md files 
export async function readDirectoryFiles(dirPath: string): Promise<{ name: string; content: string }[]> {
  const files = await fs.readdir(dirPath);
  const results = [];

  for (const file of files) {
    if (file.endsWith('.md')) { 
      const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
      results.push({ name: file, content });
    }
  }
  return results;
}