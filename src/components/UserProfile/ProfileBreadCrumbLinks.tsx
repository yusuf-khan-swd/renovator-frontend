"use client";

import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

export const ProfileBreadCrumbRoleLink = () => {
  const { role }: { role: string } = getUserInfo() as any;

  return <Link href={`/${role}`}>{role}</Link>;
};
