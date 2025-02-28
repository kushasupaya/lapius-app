import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/lib/mdx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User } from "lucide-react";

export default async function BlogHome() {
  // const blogs = await getBlogList();

  const posts = await getAllPosts();
  const categories = await getAllCategories();
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mt-20">Blogs</h1>
      <h2 className="text-center mt-1 mb-8">Welcome to our blog section.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-0">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.frontmatter.categories.map((category: string) => (
                  <Link href={`/category/${category}`} key={category}>
                    <Badge variant="outline" className="hover:bg-secondary">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
              <CardTitle className="text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.frontmatter.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4 flex-grow">
              <p className="text-muted-foreground line-clamp-3">
                {post.frontmatter.excerpt}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
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
                {post.frontmatter.readingTime} min
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map(({ slug, frontmatter }) => (
            <Link key={slug} href={`/blogs/${slug}`} passHref>
              <div className="rounded-lg hover:shadow-lg hover:bg-gray-100 p-4 cursor-pointer">
                {frontmatter.image && (
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title || "Blog Image"}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="py-4">
                  <h2 className="text-xl font-bold">{frontmatter.title}</h2>
                  <p className="text-gray-600 text-sm">{frontmatter.date}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blog posts available.</p>
        )}
      </div> */}
    </div>
  );
}

// export default BlogHome;
