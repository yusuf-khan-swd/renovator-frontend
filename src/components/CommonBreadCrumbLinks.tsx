"use client";

import { getUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import DashboardLink from "./DashboardLink";

export const CommonBreadCrumbRoleLink = () => {
  const { role } = getUserInfo() as any;

  return <DashboardLink>{role}</DashboardLink>;
};

export const BreadCrumbHomeLink = () => {
  return (
    <Link href="/">
      <HomeOutlined />
    </Link>
  );
};
