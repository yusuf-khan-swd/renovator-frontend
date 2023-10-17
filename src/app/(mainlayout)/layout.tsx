"use client";

import MainNavbar from "@/components/ui/MainNavbar";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainNavbar />
      <h3>
        <Link href="/profile">profile</Link>
      </h3>
      {children}
    </div>
  );
};

export default MainLayout;
