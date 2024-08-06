"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

const CreateAdminPage = ({ pageRoute }: { pageRoute?: string }) => {
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

export default CreateAdminPage;
