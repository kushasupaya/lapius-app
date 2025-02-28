import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getBlogData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
    const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { frontmatter, content };
  } catch (error) {
    return null;
  }
}
