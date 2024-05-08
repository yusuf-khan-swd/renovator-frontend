"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const BreadCrumbLink = ({ children }: { children?: React.ReactNode }) => {
  const { role } = getUserInfo() as any;

  return <Link href={`/${role}`}>{role}</Link>;
};

export default BreadCrumbLink;
