"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const BreadCrumbLink = ({
  pageRoute,
  children,
}: {
  pageRoute?: string;
  children: React.ReactNode;
}) => {
  const { role } = getUserInfo() as any;

  return <Link href={`/${role}/${pageRoute}`}>{children}</Link>;
};

export default BreadCrumbLink;
