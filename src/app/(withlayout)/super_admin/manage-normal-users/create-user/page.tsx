import CreateUser from "@/components/ManageUser/CreateUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateUserPage = () => {
  return (
    <div>
      <CreateUser routeName="manage-normal-users" />
    </div>
  );
};

export default CreateUserPage;
