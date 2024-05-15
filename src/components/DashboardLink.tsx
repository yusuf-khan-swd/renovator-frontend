"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const DashboardLink = ({
  route,
  children,
}: {
  route?: string;
  children: React.ReactNode;
}) => {
  const { role } = getUserInfo() as any;
  const pageRoute = route ? `/${route}` : "";

  return <Link href={`/${role}${pageRoute}`}>{children}</Link>;
};

export default DashboardLink;
