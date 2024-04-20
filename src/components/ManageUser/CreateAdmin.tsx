"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const CreateAdmin = ({ pageRoute }: { pageRoute?: string }) => {
  const { role } = getUserInfo() as any;
  const routeName = pageRoute || "manage-users";
  const endName = "create-admin";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: routeName },
          { label: endName, link: `${routeName}/${endName}` },
        ]}
      />

      <div>
        <AdminForm />
      </div>
    </div>
  );
};

export default CreateAdmin;
