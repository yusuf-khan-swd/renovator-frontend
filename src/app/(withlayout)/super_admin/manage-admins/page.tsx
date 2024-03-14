import ManageAdminUser from "@/components/ManageUser/ManageAdminUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Admin User - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAdminUserPage = () => {
  return (
    <div>
      <ManageAdminUser />
    </div>
  );
};

export default ManageAdminUserPage;
