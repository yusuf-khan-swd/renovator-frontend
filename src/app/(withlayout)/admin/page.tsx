"use client";

import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

// TODO: Add manage-feedbacks from home page bottom comment form.

const AdminPage = () => {
  const { role } = getUserInfo() as any;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <UserProfile />
    </div>
  );
};

export default AdminPage;
