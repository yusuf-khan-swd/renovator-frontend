import UserProfile from "@/components/UserProfile/UserProfile";
import { Breadcrumb } from "antd";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profile Page - Renovator",
  description: "A Home Renovation Service Provider",
};

const ProfilePage = () => {
  return (
    <div>
      <Breadcrumb items={[{ title: <Link href="/profile">profile</Link> }]} />

      <UserProfile />
    </div>
  );
};

export default ProfilePage;
