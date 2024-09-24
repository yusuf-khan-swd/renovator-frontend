import EditUserPage from "@/components/ManageUser/EditUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditUser = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <EditUserPage id={id} />;
};

export default EditUser;
