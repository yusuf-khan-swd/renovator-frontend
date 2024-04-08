"use client";

import { getUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

const ProfileBreadCrumb = ({ userId }: { userId?: string }) => {
  const { role }: { role: string } = getUserInfo() as any;

  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: <Link href={`/${role}`}>{role}</Link>,
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
