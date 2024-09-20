import UserProfilePage from "@/components/UserProfile/UserProfilePage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const Admin = () => {
  return (
    <div>
      <UserProfilePage />
    </div>
  );
};

export default Admin;
