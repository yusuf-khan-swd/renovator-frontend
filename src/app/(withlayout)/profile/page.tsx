"use client";

import { useProfileQuery } from "@/redux/api/profileApi";

const ProfilePage = () => {
  const { data, isLoading } = useProfileQuery(undefined);

  console.log(data);

  return (
    <div>
      <h1>Welcome back to your profile id: {data?.id}</h1>
    </div>
  );
};

export default ProfilePage;
