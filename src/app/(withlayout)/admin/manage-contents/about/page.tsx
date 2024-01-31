import ManageBlog from "@/components/ManageContent/ManageAbout/ManageBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAboutUsPage = () => {
  return (
    <div>
      <ManageBlog />
    </div>
  );
};

export default ManageAboutUsPage;
