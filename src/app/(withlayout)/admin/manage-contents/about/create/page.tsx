import CreateAboutUsPage from "@/components/ManageContent/ManageAboutUs/CreateAboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAboutUs = () => {
  return <CreateAboutUsPage />;
};

export default CreateAboutUs;
