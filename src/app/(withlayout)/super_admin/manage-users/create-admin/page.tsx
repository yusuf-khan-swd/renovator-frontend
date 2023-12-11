"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const CreateAdminPage = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-users";
  const endName = "create-admin";

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
        <AdminForm />
      </div>
    </div>
  );
};

export default CreateAdminPage;
