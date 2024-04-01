"use client";

import { Button, Layout, Menu } from "antd";
import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Sider: AntSidebar } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as any;

  return (
    <AntSidebar
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="xl"
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: `${collapsed ? "15px" : "25px"}`,
          textAlign: "center",
          fontWeight: `${collapsed ? "normal" : "bold"}`,
          margin: "12px 2px",
        }}
      >
        <Link href="/">Renovator</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="link"
          style={{ border: "0.2px solid grey" }}
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Open" : "Close"}
        >
          {collapsed ? (
            <RightOutlined style={{ fontSize: "21px", color: "#a6adb4" }} />
          ) : (
            <LeftOutlined style={{ fontSize: "21px", color: "#a6adb4" }} />
          )}
        </Button>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </AntSidebar>
  );
};

export default SideBar;
