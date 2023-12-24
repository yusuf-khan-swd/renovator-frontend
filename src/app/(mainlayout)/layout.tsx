"use client";

import CallOut from "@/components/ui/CallOut";
import MainNavbar from "@/components/ui/MainNavbar";
import { GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const year = new Date().getFullYear();
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
      <MainNavbar />
      <div style={{ padding: "20px 50px", minHeight: "100vh" }}>{children}</div>
      <CallOut />
      <Footer style={{ textAlign: "center" }}>
        Renovator ©{year} Created by yusuf
        <div style={{ margin: "16px 0" }}>
          <a
            href="https://github.com/yusuf-khan-swd/renovator-frontend"
            target="_blank"
          >
            <Button size="large" type="link" style={{ color: "initial" }}>
              <GithubOutlined
                title="Click to view Github Code"
                style={{ fontSize: "24px" }}
              />
            </Button>
          </a>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
