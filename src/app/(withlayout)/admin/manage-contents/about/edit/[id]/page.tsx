import EditAboutUsPage from "@/components/ManageContent/ManageAboutUs/EditAboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditAboutUs = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditAboutUsPage id={id} />
    </div>
  );
};

export default EditAboutUs;
