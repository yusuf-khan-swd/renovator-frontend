import CreateAdmin from "@/components/ManageUser/CreateAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateAdminPage = () => {
  return (
    <div>
      <CreateAdmin />
    </div>
  );
};

export default CreateAdminPage;
