"use client";

import AdminForm from "@/components/AdminForm/AdminForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const CreateAdminPage = () => {
  return (
    <div>
      <UMBreadCrumb
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
