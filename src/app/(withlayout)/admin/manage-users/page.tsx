import ManageUserPage from "@/components/ManageUser/ManageUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users - Renovator",
  description: "A Home Renovation Service Provider",
};

// TODO: Call ManageNormalUser component for showing admin manage-users table information
// TODO: Remove else if role === admin block of from getAllUsers service and make this route super_admin route

const ManageUser = () => {
  return <ManageUserPage />;
};

export default ManageUser;
