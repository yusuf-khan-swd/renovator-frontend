import CreateBlog from "@/components/ManageContent/ManageBlog/CreateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About - Renovator",
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
