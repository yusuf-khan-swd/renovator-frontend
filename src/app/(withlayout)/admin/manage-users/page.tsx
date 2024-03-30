import ManageNormalUserPage from "@/components/ManageUser/ManageNormalUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users - Renovator",
  description: "A Home Renovation Service Provider",
};

// TODO: Remove else if role === admin block of from getAllUsers service and make this route super_admin route

const ManageUser = () => {
  return <ManageNormalUserPage pageRoute="manage-users" />;
};

export default ManageUser;
