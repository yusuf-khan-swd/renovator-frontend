"use client";

import CallOut from "@/components/ui/CallOut";
import FooterUI from "@/components/ui/FooterUI";
import MainNavbar from "@/components/ui/MainNavbar";
import "./layout.css";

import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
      <MainNavbar />
      <div className="main-layout">{children}</div>
      <CallOut />
      <FooterUI />
    </div>
  );
};

export default MainLayout;
