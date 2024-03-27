import ManageNormalUserPage from "@/components/ManageUser/ManageNormalUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Normal Users - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageNormalUser = () => {
  return (
    <div>
      <ManageNormalUserPage />
    </div>
  );
};

export default ManageNormalUser;
