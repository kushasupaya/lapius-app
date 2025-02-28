import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export async function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      const frontmatter = {
        title: data.title || "Untitled Post",
        date: data.date || new Date().toISOString(),
        author: data.author || "Anonymous",
        excerpt: data.excerpt || "",
        categories: data.categories || ["Uncategorized"],
        readingTime: data.readingTime || calculateReadingTime(content),
        ...data,
      };

      return {
        slug,
        frontmatter,
        content: contentHtml,
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostsByCategory(category: string) {
  console.log(`Fetching posts for category: ${category}`);
  const allPosts = await getAllPosts();
  console.log(`Total posts: ${allPosts.length}`);
  const filteredPosts = allPosts.filter((post) =>
    post.frontmatter.categories.includes(category)
  );
  console.log(
    `Filtered posts for category ${category}: ${filteredPosts.length}`
  );
  return filteredPosts;
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const categories = new Set(
    posts.flatMap((post) => post.frontmatter.categories)
  );
  return Array.from(categories);
}

export async function getPostBySlug(slug: string) {
  let fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // const processedContent = await remark().use(html).process(content);
  // const contentHtml = processedContent.toString();

  const mdxSource = await serialize(content, { parseFrontmatter: true });

  const frontmatter = {
    title: data.title || "Untitled Post",
    date: data.date || new Date().toISOString(),
    author: data.author || "Anonymous",
    excerpt: data.excerpt || "",
    categories: data.categories || ["Uncategorized"],
    readingTime: data.readingTime || calculateReadingTime(content),
    ...data,
  };

  return {
    slug,
    frontmatter,
    content: mdxSource,
  };
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
