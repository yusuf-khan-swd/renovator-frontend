import UserProfilePage from "@/components/UserProfile/UserProfilePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page - Renovator",
  description: "A Home Renovation Service Provider",
};

const Profile = () => {
  return <UserProfilePage />;
};

export default Profile;
