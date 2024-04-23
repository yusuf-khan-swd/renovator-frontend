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

  return (
    <div>
      <Link href={`/${role}/${pageRoute}`}>{children}</Link>
    </div>
  );
};

export default DashboardLink;
