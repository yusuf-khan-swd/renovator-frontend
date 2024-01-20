"use client";

import { Layout, Menu } from "antd";
import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log(role);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
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
          fontSize: `${collapsed ? "16px" : "25px"}`,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          padding: "10px 0px",
        }}
      >
        <Link href="/" style={{ color: "white" }}>
          Renovator
        </Link>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
