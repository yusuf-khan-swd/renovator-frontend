import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem(
      "Item 1",
      "g1",
      null,
      [getItem("Option 1", "1"), getItem("Option 2", "2")],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  { type: "divider" },

  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),

  getItem(
    "Group",
    "grp",
    null,
    [getItem("Option 13", "13"), getItem("Option 14", "14")],
    "group"
  ),
];

const DashboardDrawer = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const closeDrawer = () => {
    setTimeout(() => {
      setOpen(false);
    }, 600);
  };

  const { role } = getUserInfo() as any;

  return (
    <>
      <Button
        style={{ padding: "4px 10px", display: "flex", alignItems: "center" }}
        onClick={showDrawer}
      >
        <MenuOutlined style={{ fontSize: "21px", color: "#1677ff" }} />
      </Button>
      <Drawer
        title={
          <Link href="/" style={{ fontSize: "25px" }}>
            Renovator
          </Link>
        }
        onClose={onClose}
        open={open}
        placement="left"
      >
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub2", "sub3"]}
          mode="inline"
          items={items}
        />

        <div onClick={closeDrawer}>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={sidebarItems(role)}
          />
        </div>
      </Drawer>
    </>
  );
};

export default DashboardDrawer;
