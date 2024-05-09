import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { ProfileBreadCrumbRoleLink } from "./ProfileBreadCrumbLinks";

const ProfileBreadCrumb = ({ userId }: { userId?: string }) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: <ProfileBreadCrumbRoleLink />,
    },
    { title: <Link href="/profile">profile</Link> },
  ];

  if (userId)
    breadCrumbItems.push({
      title: <Link href={`/profile/edit/${userId}`}>edit</Link>,
    });

  return <Breadcrumb items={breadCrumbItems} />;
};

export default ProfileBreadCrumb;
