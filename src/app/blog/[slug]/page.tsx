import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";

import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User } from "lucide-react";
import MDXWrapper from "@/components/sections/blogs/mdx-wrapper";

type tParams = Promise<{ slug: string }>;

export default async function BlogPost(props: { params: tParams }) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post)
    return (
      <div className="container mx-auto py-28 px-4 md:px-6">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {post.frontmatter.categories.map((category: string) => (
                <Badge
                  variant="outline"
                  key={category}
                  className="hover:bg-primary hover:text-white"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {post.frontmatter.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {post.frontmatter.excerpt}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.frontmatter.author}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.frontmatter.readingTime} min read
              </div>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <MDXWrapper content={post.content} />
          </div>
        </article>
      </div>
    );
}

export async function generateMetadata(props: { params: tParams }) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  console.log(
    "generatedStaticParams",
    posts.map((post) => post.slug)
  );
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
