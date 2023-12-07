"use client";

import CallOut from "@/components/ui/CallOut";
import MainNavbar from "@/components/ui/MainNavbar";
import { Footer } from "antd/es/layout/layout";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <MainNavbar />
      <div style={{ padding: "20px 50px", minHeight: "100vh" }}>{children}</div>
      <CallOut />
      <Footer style={{ textAlign: "center" }}>
        Renovator ©2023 Created by yusuf
      </Footer>
    </div>
  );
};

export default MainLayout;
