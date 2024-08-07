import CreateUserPage from "@/components/ManageUser/CreateUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateUser = () => {
  return (
    <div>
      <CreateUserPage pageRoute="manage-normal-users" />
    </div>
  );
};

export default CreateUser;
