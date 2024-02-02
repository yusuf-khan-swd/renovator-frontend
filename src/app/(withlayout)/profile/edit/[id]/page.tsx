import EditUserProfile from "@/components/UserProfile/EditUserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update User Profile - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditUserProfilePage = () => {
  return (
    <div>
      <EditUserProfile />
    </div>
  );
};

export default EditUserProfilePage;
