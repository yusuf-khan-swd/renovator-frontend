import UserProfilePage from "@/components/UserProfile/UserProfilePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const SuperAdmin = () => {
  return <UserProfilePage />;
};

export default SuperAdmin;
