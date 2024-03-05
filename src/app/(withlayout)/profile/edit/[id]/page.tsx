import EditUserProfile from "@/components/UserProfile/EditUserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update User Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditUserProfilePage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  return (
    <div>
      <EditUserProfile id={id} />
    </div>
  );
};

export default EditUserProfilePage;
