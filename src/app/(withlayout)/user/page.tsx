import UserProfilePage from "@/components/UserProfile/UserProfilePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const User = () => {
  return <UserProfilePage />;
};

export default User;
