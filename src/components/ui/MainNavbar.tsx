import { Button, Layout, Row } from "antd";
import Link from "next/link";
import "./MainNavbar.css";
import MainNavbarItems from "./MainNavbarItems";
const { Header: AntHeader } = Layout;

const MainNavbar = () => {
  const websiteName = "Renovator";

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
            {websiteName.toUpperCase()}
          </Button>
        </Link>
        <div className="navbar-items">
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

        <MainNavbarItems />
      </Row>
    </AntHeader>
  );
};

export default MainNavbar;
