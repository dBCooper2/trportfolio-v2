import fs from 'fs';
import path from 'path';

export async function fetchMarkdownContent(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  const content = await fs.promises.readFile(fullPath, 'utf8');
  return content;
}