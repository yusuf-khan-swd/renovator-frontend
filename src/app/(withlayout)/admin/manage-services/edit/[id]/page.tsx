import EditService from "@/components/ManageService/EditService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditServicePage = () => {
  return (
    <div>
      <EditService />
    </div>
  );
};

export default EditServicePage;
