"use client";

import CallOut from "@/components/ui/CallOut";
import FooterUI from "@/components/ui/FooterUI";
import MainNavbar from "@/components/ui/MainNavbar";

import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <MainNavbar />
      <div style={{ padding: "20px 50px", minHeight: "100vh" }}>{children}</div>
      <CallOut />
      <FooterUI />
    </div>
  );
};

export default MainLayout;
