import CreateBlog from "@/components/ManageContent/ManageAbout/CreateBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAboutUsPage = () => {
  return (
    <div>
      <CreateBlog />
    </div>
  );
};

export default CreateAboutUsPage;
