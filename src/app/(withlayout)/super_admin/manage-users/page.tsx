import ManageUserPage from "@/components/ManageUser/ManageUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageUser = () => {
  return (
    <div>
      <ManageUserPage />
    </div>
  );
};

export default ManageUser;
