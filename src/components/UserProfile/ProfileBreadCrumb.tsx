import { Breadcrumb } from "antd";
import Link from "next/link";
import {
  ProfileBreadCrumbHomeLink,
  ProfileBreadCrumbProfileLink,
  ProfileBreadCrumbRoleLink,
} from "./ProfileBreadCrumbLinks";

const ProfileBreadCrumb = ({ userId }: { userId?: string }) => {
  const breadCrumbItems = [
    {
      title: <ProfileBreadCrumbHomeLink />,
    },
    {
      title: <ProfileBreadCrumbRoleLink />,
    },
    { title: <ProfileBreadCrumbProfileLink /> },
  ];

  if (userId)
    breadCrumbItems.push({
      title: <Link href={`/profile/edit/${userId}`}>edit</Link>,
    });

  return <Breadcrumb items={breadCrumbItems} />;
};

export default ProfileBreadCrumb;
