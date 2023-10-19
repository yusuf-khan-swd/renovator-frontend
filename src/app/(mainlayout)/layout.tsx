"use client";

import MainNavbar from "@/components/ui/MainNavbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainNavbar />
      <div style={{ padding: "20px 80px" }}>{children}</div>
    </div>
  );
};

export default MainLayout;
