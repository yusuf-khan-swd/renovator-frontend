"use client";

import MainNavbar from "@/components/ui/MainNavbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
};

export default MainLayout;
