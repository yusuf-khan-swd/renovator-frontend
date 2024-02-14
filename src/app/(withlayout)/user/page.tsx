import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const UserPage = () => {
  return (
    <div>
      <CommonBreadCrumb />
      <UserProfile />
    </div>
  );
};

export default UserPage;
