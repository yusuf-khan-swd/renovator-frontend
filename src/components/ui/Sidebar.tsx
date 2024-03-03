"use client";

import { Button, Layout, Menu } from "antd";
import { useState } from "react";

import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import Link from "next/link";
import "./Sidebar.css";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log(role);

  return (
    <div id="dashboard-sidebar">
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
        <div
          style={
            collapsed
              ? { display: "flex", justifyContent: "center" }
              : { marginLeft: "10px" }
          }
        >
          <Button
            type="link"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Open" : "Close"}
          >
            {collapsed ? (
              <FullscreenOutlined
                style={{ fontSize: "21px", color: "#1677ff" }}
              />
            ) : (
              <FullscreenExitOutlined
                style={{ fontSize: "21px", color: "#1677ff" }}
              />
            )}
          </Button>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
