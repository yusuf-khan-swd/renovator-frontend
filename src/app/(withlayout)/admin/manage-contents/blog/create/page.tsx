import CreateBlog from "@/components/ManageContent/ManageBlog/CreateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateBlogPage = () => {
  return (
    <div>
      <CreateBlog />
    </div>
  );
};

export default CreateBlogPage;
