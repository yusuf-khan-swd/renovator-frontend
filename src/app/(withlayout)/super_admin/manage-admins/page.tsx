import ManageAdminUserPage from "@/components/ManageUser/ManageAdminUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Admin User - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageAdminUser = () => {
  return <ManageAdminUserPage />;
};

export default ManageAdminUser;
