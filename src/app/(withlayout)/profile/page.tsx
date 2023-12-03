"use client";

import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { role }: { role: string } = getUserInfo() as any;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "profile",
            link: `/profile`,
          },
        ]}
      />

      <UserProfile readonly={true} />
    </div>
  );
};

export default ProfilePage;
