import { Footer, Header } from "@/components/common";
import { BlogHome } from "@/components/sections/blogs";

const blogList = [
  {
    slug: "5-medical-errors",
    frontmatter: {
      title: "5 Common Medical Billing Errors That Can Cost You Thousands",
      image: "/images/blogs/blogoneheading.png",
      date: "2024-12-13",
    },
  },
];

export default function Home() {
  return <BlogHome />;
}
