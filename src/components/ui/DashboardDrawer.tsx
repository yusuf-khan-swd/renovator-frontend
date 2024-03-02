import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
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
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title={<Link href="/">Renovator</Link>}
        onClose={onClose}
        open={open}
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
