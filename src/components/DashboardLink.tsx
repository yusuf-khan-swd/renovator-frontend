"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

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

  return <Link href={`/${role}/${pageRoute}`}>{children}</Link>;
};

export default DashboardLink;
