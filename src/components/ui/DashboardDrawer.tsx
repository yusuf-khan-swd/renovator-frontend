import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { MenuOutlined } from "@ant-design/icons";
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
