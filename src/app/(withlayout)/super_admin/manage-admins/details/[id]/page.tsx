import DetailsUserPage from "@/components/ManageUser/DetailsUserPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View User - Renovator",
  description: "A Home Renovation Service Provider",
};

const DetailsUser = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <DetailsUserPage id={id} pageRoute="manage-admins" />
    </div>
  );
};

export default DetailsUser;
