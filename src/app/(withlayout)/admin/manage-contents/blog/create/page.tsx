import CreateBlogPage from "@/components/ManageContent/ManageBlog/CreateBlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateBlog = () => {
  return (
    <div>
      <CreateBlogPage />
    </div>
  );
};

export default CreateBlog;
