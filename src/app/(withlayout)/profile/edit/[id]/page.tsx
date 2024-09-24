import EditUserProfilePage from "@/components/UserProfile/EditUserProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update User Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditUserProfile = ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  return <EditUserProfilePage id={id} />;
};

export default EditUserProfile;
