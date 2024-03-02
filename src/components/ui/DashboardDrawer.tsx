import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

const DashboardDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { role } = getUserInfo() as any;

  return (
    <>
      <Button type="link" onClick={showDrawer}>
        <MenuUnfoldOutlined style={{ fontSize: "25px" }} />
      </Button>
      <Drawer
        title={<Link href="/">Renovator</Link>}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Drawer>
    </>
  );
};

export default DashboardDrawer;
