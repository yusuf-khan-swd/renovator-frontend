import CreateAdminPage from "@/components/ManageUser/CreateAdminPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAdmin = () => {
  return (
    <div>
      <CreateAdminPage pageRoute="manage-normal-users" />
    </div>
  );
};

export default CreateAdmin;
