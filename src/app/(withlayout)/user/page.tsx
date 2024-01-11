import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User - Renovator",
  description: "A Home Renovation Service Provider",
};

// TODO: manage-cart is not checked yet
const UserPage = () => {
  return (
    <div>
      <CommonBreadCrumb />
      <UserProfile />
    </div>
  );
};

export default UserPage;
