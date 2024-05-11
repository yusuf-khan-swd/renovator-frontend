"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

// TODO: Update every Dashboard next link with this DashboardLink component

const DashboardLink = ({
  pageRoute,
  children,
}: {
  pageRoute?: string;
  children: React.ReactNode;
}) => {
  const { role } = getUserInfo() as any;
  const otherRoute = pageRoute ? `/${pageRoute}` : "";
  const otherRoute2 = pageRoute && `/${pageRoute}`;

  return <Link href={`/${role}${otherRoute}`}>{children}</Link>;
};

export default DashboardLink;
