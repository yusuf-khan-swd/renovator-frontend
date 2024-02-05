import Blog from "@/components/Blog/Blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Renovator",
  description: "A Home Renovation Service Provider",
};

const BlogPage = () => {
  return (
    <div>
      <Blog />
    </div>
  );
};

export default BlogPage;
