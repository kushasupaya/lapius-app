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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Clock, User } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function BlogHome() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const latestPosts = posts.slice(0, 3);

  const firstPost = latestPosts[0];
  // Other posts are displayed in a different layout
  const otherPosts = latestPosts.slice(1);
  return (
    <div className="container mx-auto py-12 max-w-6xl p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mt-20 mb-8">Blog</h1>
      {/* <h2 className="text-center mt-1 mb-8">Welcome to our blog section.</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {firstPost && (
          <Card
            className="lg:col-span-2 overflow-hidden"
            key={firstPost.frontmatter.title}
          >
            <div className="relative h-60">
              <Image
                src={firstPost.frontmatter.image || "/placeholder.svg"}
                alt={`${firstPost.frontmatter.categories[0]} illustration`}
                fill
                className="object-cover"
              />
              <Badge className="absolute left-4 bottom-4 bg-white text-black hover:bg-white">
                {firstPost.frontmatter.categories[0]}
              </Badge>
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <span>{firstPost.frontmatter.date}</span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                {firstPost.frontmatter.title}
              </h2>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-muted-foreground text-sm">
                {firstPost.frontmatter.excerpt}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/blog/${firstPost.slug}`}>
                <Button className="bg-primary text-white hover:shadow-lg hover:to-blue-600">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          {/* Right cards (other posts) */}
          {otherPosts.map((post) => (
            <Card key={post.frontmatter.title} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                <div className="relative h:full">
                  <Image
                    src={post.frontmatter.image || "/placeholder.svg"}
                    alt={`${post.frontmatter.categories[0]} illustration`}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute left-4 bottom-4 bg-white text-black hover:bg-white">
                    {post.frontmatter.categories[0]}
                  </Badge>
                </div>
                <div className="md:col-span-2 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{post.frontmatter.date}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="bg-primary text-white hover:to-blue-600 hover:shadow-lg">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* ✅ Category Tabs (shadcn/ui) */}
      <Tabs defaultValue="All" className="">
        <TabsList className="flex  gap-4 mb-8  bg-white">
          <TabsTrigger
            value="All"
            className="hover:bg-gray-500 hover:text-white data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          {categories.map((category: string) => (
            <TabsTrigger
              key={category}
              value={category}
              className="hover:bg-gray-500 hover:text-white data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ✅ Show All Posts */}
        <TabsContent value="All">
          <BlogPostGrid posts={posts} />
        </TabsContent>

        {/* ✅ Show Posts by Category */}
        {categories.map((category: string) => (
          <TabsContent key={category} value={category}>
            <BlogPostGrid
              posts={posts.filter((post) =>
                post.frontmatter.categories.includes(category)
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

/* ✅ Extracted BlogPostGrid Component */
function BlogPostGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
            key={post.slug}
          >
            <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg   ">
              {/* ✅ Clickable Header for Blog Post */}

              <CardHeader className="pb-0">
                <div className="flex flex-wrap gap-2 mb-2">
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
                <CardTitle className="text-2xl">
                  {post.frontmatter.title}
                </CardTitle>
              </CardHeader>

              {/* Post Excerpt */}
              <CardContent className="py-4 flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  {post.frontmatter.excerpt}
                </p>
              </CardContent>

              {/* Footer with Metadata */}
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
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-3">
          No blog posts available in this category.
        </p>
      )}
    </div>
  );
}
