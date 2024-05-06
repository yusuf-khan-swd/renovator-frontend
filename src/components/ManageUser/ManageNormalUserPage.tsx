"use client";

import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import { ENUM_USER_ROLE } from "@/constants/role";
import { useNormalUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import DashboardLink from "../DashboardLink";
import CommonUserColumn from "./CommonUserColumn";

const ManageNormalUserPage = ({ pageRoute }: { pageRoute?: string }) => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useNormalUsersQuery(undefined);

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const { role } = getUserInfo() as any;
  const routeName = pageRoute || "manage-normal-users";

  return (
    <div>
      <CommonBreadCrumb items={[{ label: routeName, link: routeName }]} />
      <ActionBar title="User List">
        <Col xs={24} sm={12} lg={8} style={{ margin: "10px 0" }}>
          <Input
            size="large"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <div>
          {role === ENUM_USER_ROLE.SUPER_ADMIN && (
            <>
              <DashboardLink pageRoute={`${routeName}/create-admin`}>
                <Button type="primary" style={{ margin: "2px" }}>
                  Create Admin
                </Button>
              </DashboardLink>
              <Link href={`/${role}/${routeName}/create-admin`}>
                <Button type="primary" style={{ margin: "2px" }}>
                  Create Admin
                </Button>
              </Link>
            </>
          )}
          <Link href={`/${role}/${routeName}/create-user`}>
            <Button type="primary" style={{ margin: "2px" }}>
              Create User
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "2px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <CommonTable
        loading={isLoading}
        columns={CommonUserColumn(routeName)}
        dataSource={data}
        pageSize={size}
        totalPages={0}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageNormalUserPage;
