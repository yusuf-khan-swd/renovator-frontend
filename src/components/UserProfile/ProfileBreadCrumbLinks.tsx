"use client";

import { getUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export const ProfileBreadCrumbRoleLink = () => {
  const { role }: { role: string } = getUserInfo() as any;

  return <Link href={`/${role}`}>{role}</Link>;
};

export const ProfileBreadCrumbHomeLink = () => {
  return (
    <Link href="/">
      <HomeOutlined />
    </Link>
  );
};

export const ProfileBreadCrumbProfileLink = () => {
  return <Link href="/profile">profile</Link>;
};
