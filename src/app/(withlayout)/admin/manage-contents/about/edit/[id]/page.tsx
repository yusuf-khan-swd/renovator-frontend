import EditAboutUs from "@/components/ManageContent/ManageAboutUs/EditAboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditAboutUsPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditAboutUs id={id} />
    </div>
  );
};

export default EditAboutUsPage;
