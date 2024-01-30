import EditBlog from "@/components/ManageContent/ManageBlog/EditBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit About - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditBlogPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditBlog id={id} />
    </div>
  );
};

export default EditBlogPage;
