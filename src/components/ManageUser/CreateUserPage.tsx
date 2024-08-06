"use client";

import UserForm from "@/components/UserForm/UserForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

const CreateUserPage = ({ pageRoute }: { pageRoute?: string }) => {
  const routeName = pageRoute || "manage-users";
  const endName = "create-user";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: routeName },
          { label: endName, link: `${routeName}/${endName}` },
        ]}
      />
      <div>
        <UserForm />
      </div>
    </div>
  );
};

export default CreateUserPage;
