import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
import "./MainNavbar.css";
import MainNavbarItems from "./MainNavbarItems";
const { Header: AntHeader } = Layout;

const MainNavbar = () => {
  const websiteName = "Renovator";

  const navbarItems = (
    <>
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
    </>
  );

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href="/home">
          <Button type="link">Home</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link href="/service">
          <Button type="link">Service</Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/blog">
          <Button type="link">Blog</Button>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href="/faq">
          <Button type="link">FAQ</Button>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/about">
          <Button type="link">About Us</Button>
        </Link>
      ),
    },
  ];

  return (
    <AntHeader
      id="ant-header"
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
        <Row justify="center" align="middle">
          <div className="drop-down" style={{ marginRight: "5px" }}>
            <Dropdown menu={{ items }}>
              <Space wrap size={16}>
                <Avatar icon={<MenuOutlined />} />
              </Space>
            </Dropdown>
          </div>

          <div>
            <Link href="/home">
              <Button
                type="link"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <span className="website-name">
                  {websiteName.toUpperCase()}
                </span>
              </Button>
            </Link>
          </div>
        </Row>
        <div className="navbar-items">{navbarItems}</div>

        <MainNavbarItems />
      </Row>
    </AntHeader>
  );
};

export default MainNavbar;
