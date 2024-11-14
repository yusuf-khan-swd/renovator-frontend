import ManageAboutUsPage from "@/components/ManageContent/ManageAboutUs/ManageAboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAboutUs = () => {
  return <ManageAboutUsPage />;
};

export default ManageAboutUs;
