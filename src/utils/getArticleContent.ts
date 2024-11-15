// src/lib/getArticleContent.ts
import fs from "fs/promises";
import path from "path";

export async function getArticleContent(filename: string) {
  const filePath = path.join(process.cwd(), "src", "_articles", filename);
  return await fs.readFile(filePath, "utf8");
}
