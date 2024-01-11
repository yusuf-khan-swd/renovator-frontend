import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Renovator",
  description: "A Home Renovation Service Provider",
};

// TODO: Add manage-feedbacks from home page bottom comment form.
const AdminPage = () => {
  return (
    <div>
      <CommonBreadCrumb />
      <UserProfile />
    </div>
  );
};

export default AdminPage;
