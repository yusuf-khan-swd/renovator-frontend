"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const CreateAdmin = ({ page }: { page?: string }) => {
  const { role } = getUserInfo() as any;
  const routeName = page || "manage-users";
  const endName = "create-admin";

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
        <AdminForm />
      </div>
    </div>
  );
};

export default CreateAdmin;
