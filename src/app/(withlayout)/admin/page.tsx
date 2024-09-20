import UserProfilePage from "@/components/UserProfile/UserProfilePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const Admin = () => {
  return <UserProfilePage />;
};

export default Admin;
