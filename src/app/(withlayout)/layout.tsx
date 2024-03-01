"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import DashboardDrawer from "@/components/ui/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Contents from "../../components/ui/Contents";
import SideBar from "../../components/ui/Sidebar";
import "./layout.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router, isLoading, userLoggedIn]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Layout
      style={{ minHeight: "115vh", maxWidth: "1600px", margin: "0 auto" }}
    >
      <div>
        <DashboardDrawer />
      </div>
      <div id="dashboard-sidebar">
        <SideBar />
      </div>
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
