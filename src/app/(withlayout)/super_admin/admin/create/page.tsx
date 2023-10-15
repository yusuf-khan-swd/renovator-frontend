"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

const CreateAdminPage = () => {
  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin/admin",
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
