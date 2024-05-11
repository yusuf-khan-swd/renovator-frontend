"use client";

import { getUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export const BreadCrumbRoleLink = () => {
  const { role } = getUserInfo() as any;

  return <Link href={`/${role}`}>{role}</Link>;
};

export const BreadCrumbHomeLink = () => {
  return (
    <Link href="/">
      <HomeOutlined />
    </Link>
  );
};