"use client";

import SignupPage from "@/components/Signup/Signup";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const page = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-users";
  const endName = "create-user";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: routeName,
            link: `/${role}/${routeName}`,
          },
          {
            label: endName,
            link: `/${role}/${routeName}/${endName}`,
          },
        ]}
      />
      <div>
        <SignupPage />
      </div>
    </div>
  );
};

export default page;
