import ManageNormalUserPage from "@/components/ManageUser/ManageNormalUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageUser = () => {
  return <ManageNormalUserPage pageRoute="manage-users" />;
};

export default ManageUser;
