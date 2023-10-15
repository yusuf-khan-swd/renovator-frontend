import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";

const ManageUsersPage = () => {
  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <h1>User List</h1>
    </div>
  );
};

export default ManageUsersPage;
