import DetailsUser from "@/components/ManageUser/DetailsUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View User - Renovator",
  description: "A Home Renovation Service Provider",
};

const DetailsUserPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <DetailsUser id={id} pageRoute="manage-admins" />
    </div>
  );
};

export default DetailsUserPage;
