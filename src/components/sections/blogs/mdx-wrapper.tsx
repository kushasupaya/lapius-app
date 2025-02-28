"use client";

import dynamic from "next/dynamic";

const MDXContent = dynamic(
  () =>
    import("@/components/sections/blogs/mdx-content").then(
      (mod) => mod.MDXContent
    ),
  { ssr: false }
);

export default function MDXWrapper({ content }: { content: any }) {
  return <MDXContent content={content} />;
}
