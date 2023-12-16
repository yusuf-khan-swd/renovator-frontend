"use client";

import { Button, Layout, Row } from "antd";
import Link from "next/link";
import MainSidebarItems from "./MainSidebarItems";
const { Header: AntHeader } = Layout;

const MainNavbar = () => {
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
          <Link href="/home">
            <Button type="link">Home</Button>
          </Link>
          <Link href="/service">
            <Button type="link">Service</Button>
          </Link>
          <Link href="/blog">
            <Button type="link">Blog</Button>
          </Link>
          <Link href="/faq">
            <Button type="link">FAQ</Button>
          </Link>
          <Link href="/about">
            <Button type="link">About Us</Button>
          </Link>
        </div>

        <MainSidebarItems />
      </Row>
    </AntHeader>
  );
};

export default MainNavbar;
