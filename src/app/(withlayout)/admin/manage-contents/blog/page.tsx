import ManageBlogPage from "@/components/ManageContent/ManageBlog/ManageBlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Blogs - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageBlog = () => {
  return (
    <div>
      <ManageBlogPage />
    </div>
  );
};

export default ManageBlog;
