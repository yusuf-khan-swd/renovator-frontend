"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const CreateAdminPage = () => {
  const { role } = getUserInfo() as any;
  const base = role;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "manage-users",
            link: `/${base}/manage-users`,
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
