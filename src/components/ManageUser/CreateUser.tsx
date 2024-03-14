"use client";

import UserForm from "@/components/UserForm/UserForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const CreateUser = ({ pageRoute }: { pageRoute?: string }) => {
  const { role } = getUserInfo() as any;
  const routeName = pageRoute || "manage-users";
  const endName = "create-user";

  return (
    <div>
      <CommonBreadCrumb
        items={[
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
        <UserForm />
      </div>
    </div>
  );
};

export default CreateUser;
