import UserProfile from "@/components/UserProfile/UserProfile";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const SuperAdminPage = () => {
  return <UserProfile />;
};

export default SuperAdminPage;
