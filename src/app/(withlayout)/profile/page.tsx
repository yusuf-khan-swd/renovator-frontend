import UserProfile from "@/components/UserProfile/UserProfile";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page - Renovator",
  description: "A Home Renovation Service Provider",
};

const ProfilePage = () => {
  return <UserProfile />;
};

export default ProfilePage;
