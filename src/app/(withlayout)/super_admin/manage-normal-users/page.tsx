import ManageNormalUser from "@/components/ManageUser/ManageNormalUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Admins - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageNormalUserPage = () => {
  return (
    <div>
      <ManageNormalUser />
    </div>
  );
};

export default ManageNormalUserPage;
