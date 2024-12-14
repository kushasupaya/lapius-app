import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

async function getBlogList() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join(blogDir, filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });
}

const BlogHome = async () => {
  const blogs = await getBlogList();
  console.log(blogs);
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mt-20">Blogs</h1>
      <h2 className=" text-center mt-1 mb-8">Welcome to our blog section.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(({ slug, frontmatter }) => (
          <Link key={slug} href={`/blogs/${slug}`}>
            <div className="rounded-lg hover:shadow-lg hover:bg-gray-100 p-4 cursor-pointer">
              <Image
                src={frontmatter.image}
                alt="Blog Image"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="py-4">
                <h2 className="text-xl font-bold">{frontmatter.title}</h2>
                <p className="text-gray-600 text-sm">{frontmatter.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
