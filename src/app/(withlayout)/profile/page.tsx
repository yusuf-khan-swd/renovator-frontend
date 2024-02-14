import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page - Renovator",
  description: "A Home Renovation Service Provider",
};

const ProfilePage = () => {
  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: "profile",
            link: `/profile`,
          },
        ]}
      />

      <UserProfile />
    </div>
  );
};

export default ProfilePage;
