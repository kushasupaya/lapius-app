import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };
interface BlogPageProps {
  params: { slug: string };
}
export default async function PostPage({ params }: BlogPageProps) {
  const { slug } = await params; // Safely destructure slug here

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options,
  );
  const postImageUrl = (await post?.mainImage)
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;
  console.log(post);
  return (
    <main className="container mx-auto  py-12 mt-20 flex flex-col gap-4">
      <Link href="/blogs" className="hover:underline ">
        ← Back to posts
      </Link>

      <h1 className="text-4xl max-w-[500px] inline-flex text-center mx-auto font-bold mb-8">
        {post?.title}
      </h1>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post?.title}
          className="aspect-video rounded-xl items-center block mx-auto"
          width="550"
          height="310"
        />
      )}
      <div className="px-28 space-y-4 leading-8 tracking-wide">
        <p>Published: {new Date(post?.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post?.body) && <PortableText value={post?.body} />}
      </div>
    </main>
  );
}
