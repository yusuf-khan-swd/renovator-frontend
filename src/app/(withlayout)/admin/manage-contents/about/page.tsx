import ManageAboutUs from "@/components/ManageContent/ManageAboutUs/ManageAboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage About Us Content - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAboutUsPage = () => {
  return (
    <div>
      <ManageAboutUs />
    </div>
  );
};

export default ManageAboutUsPage;
