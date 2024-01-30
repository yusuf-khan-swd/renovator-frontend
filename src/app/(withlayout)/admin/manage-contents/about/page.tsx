import ManageBlog from "@/components/ManageContent/ManageAbout/ManageBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage About - Renovator",
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
