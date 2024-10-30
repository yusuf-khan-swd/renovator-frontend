import EditBlogPage from "@/components/ManageContent/ManageBlog/EditBlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Blog - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditBlog = ({ params }: any) => {
  const id = params?.id;

  return <EditBlogPage id={id} />;
};

export default EditBlog;
