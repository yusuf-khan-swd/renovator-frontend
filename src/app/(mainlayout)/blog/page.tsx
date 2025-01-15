import BlogPage from "@/components/Blog/BlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Renovator",
  description: "A Home Renovation Service Provider",
};

const Blog = () => {
  return <BlogPage />;
};

export default Blog;
