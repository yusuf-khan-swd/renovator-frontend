import EditBlog from "@/components/ManageContent/ManageAbout/EditBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditAboutUsPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditBlog id={id} />
    </div>
  );
};

export default EditAboutUsPage;
