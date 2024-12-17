// import { Footer, Header } from "@/components/common";
// import { BlogHome } from "@/components/sections/blogs";

// const blogList = [
//   {
//     slug: "5-medical-errors",
//     frontmatter: {
//       title: "5 Common Medical Billing Errors That Can Cost You Thousands",
//       image: "/images/blogs/blogoneheading.png",
//       date: "2024-12-13",
//     },
//   },
// ];
// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

// export default function Home() {
//   return <div></div>;
// }

import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/blogs/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
