import CreateAdminPage from "@/components/ManageUser/CreateAdminPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAdmin = () => {
  return <CreateAdminPage pageRoute="manage-admins" />;
};

export default CreateAdmin;
