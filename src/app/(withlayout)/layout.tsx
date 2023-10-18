"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Contents from "../../components/ui/Contents";
import SideBar from "../../components/ui/Sidebar";

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
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
