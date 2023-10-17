"use client";

import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const MainNavbar = () => {
  const logOut = () => {
    removeUserInfo(authKey);
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Link href="/home">
          <Button type="link" style={{ fontSize: "25px", fontWeight: "bold" }}>
            RENOVATOR
          </Button>
        </Link>
        <div style={{}}>
          <Link href="/service">
            <Button type="link">Service</Button>
          </Link>
          <Link href="/blog">
            <Button type="link">Blog</Button>
          </Link>
          <Link href="/faq">
            <Button type="link">FAQ</Button>
          </Link>
          <Link href="/services">
            <Button type="link">About Us</Button>
          </Link>
        </div>
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          {role}
        </p>
        {role ? (
          <Dropdown menu={{ items }}>
            <a>
              <Space wrap size={16}>
                <Avatar icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <div>
            <Link href="signup">
              <Button style={{ marginRight: "5px" }}>Signup</Button>
            </Link>
            <Link href="/login">
              <Button type="primary">login</Button>
            </Link>
          </div>
        )}
      </Row>
    </AntHeader>
  );
};

export default MainNavbar;
