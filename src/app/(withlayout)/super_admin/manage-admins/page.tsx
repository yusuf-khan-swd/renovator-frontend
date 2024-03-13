import ManageAdmin from "@/components/ManageUser/ManageAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Admins - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAdminPage = () => {
  return (
    <div>
      <ManageAdmin />
    </div>
  );
};

export default ManageAdminPage;
