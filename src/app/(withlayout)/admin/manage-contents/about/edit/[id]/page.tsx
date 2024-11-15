import EditAboutUsPage from "@/components/ManageContent/ManageAboutUs/EditAboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditAboutUs = ({ params }: any) => {
  const id = params?.id;

  return <EditAboutUsPage id={id} />;
};

export default EditAboutUs;
