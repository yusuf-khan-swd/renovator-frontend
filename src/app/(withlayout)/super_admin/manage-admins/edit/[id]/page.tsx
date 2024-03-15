import EditUser from "@/components/ManageUser/EditUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditUser id={id} pageRoute="manage-admins" />
    </div>
  );
};

export default EditUserPage;
