"use client";

import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { userId } = getUserInfo() as any;
  console.log(userId);

  return (
    <div>
      <h1>Welcome back to your profile id: {userId}</h1>
    </div>
  );
};

export default ProfilePage;
