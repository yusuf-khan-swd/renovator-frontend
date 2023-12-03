"use client";

import UserProfile from "@/components/UserProfile/UserProfile";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";

// todo:: create a component for profile page that going to be use in all user home page

const SuperAdminPage = () => {
  const { data, isLoading } = useProfileQuery(undefined);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role || "",
  };

  const { role } = getUserInfo() as any;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />

      <UserProfile readonly={true} />
    </div>
  );
};

export default SuperAdminPage;
