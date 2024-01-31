import CreateAboutUs from "@/components/ManageContent/ManageAboutUs/CreateAboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAboutUsPage = () => {
  return (
    <div>
      <CreateAboutUs />
    </div>
  );
};

export default CreateAboutUsPage;
