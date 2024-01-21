import ManageBlog from "@/components/ManageBlog/ManageBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Blogs - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageBlogPage = () => {
  return (
    <div>
      <ManageBlog />
    </div>
  );
};

export default ManageBlogPage;
