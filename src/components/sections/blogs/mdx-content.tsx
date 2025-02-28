"use client";

import { useMemo } from "react";
import { MDXRemote } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4"
      {...props}
    />
  ),
  a: (props: any) => <a className="text-primary hover:underline" {...props} />,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={vscDarkPlus}
        className="rounded-md my-4"
        showLineNumbers
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  img: (props: any) => (
    <img className="rounded-lg my-8 max-w-full h-auto" {...props} />
  ),
};

export function MDXContent({ content }: { content: any }) {
  const mdxComponents = useMemo(() => components, []);

  return <MDXRemote {...content} components={mdxComponents} />;
}
