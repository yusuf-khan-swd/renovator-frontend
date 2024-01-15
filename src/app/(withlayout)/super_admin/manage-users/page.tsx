import ManageUser from "@/components/ManageUser/ManageUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageUserPage = () => {
  return (
    <div>
      <ManageUser />
    </div>
  );
};

export default ManageUserPage;
