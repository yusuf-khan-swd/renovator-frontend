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

  // TODO: Check Dashboard all of the input field responsive
  // TODO: Table responsive with horizontal and vertical scroll
  // TODO: Update every table of user, admin, super_admin column with width

  return (
    <Layout
      style={{ minHeight: "115vh", maxWidth: "1600px", margin: "0 auto" }}
    >
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
