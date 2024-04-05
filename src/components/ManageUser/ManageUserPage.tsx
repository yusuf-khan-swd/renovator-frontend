"use client";

import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import { useUsersQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Select } from "antd";
import Link from "next/link";
import { useState } from "react";
import { SelectOptions } from "../Forms/FormSelectField";
import CommonUserColumn from "./CommonUserColumn";

const roleOptionsFilter = [
  { label: "All", value: "all" },
  { label: "USER", value: "user" },
  { label: "ADMIN", value: "admin" },
];

const ManageUserPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectRole, setSelectRole] = useState<string>();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useUsersQuery({ role: selectRole });

  const handleRoleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectRole(value);
  };

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
    setSelectRole(undefined);
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-users";

  // TODO: Change Col structure of Search and Filter

  return (
    <div>
      <CommonBreadCrumb
        items={[{ label: routeName, link: `/${role}/${routeName}` }]}
      />
      <ActionBar title="User List">
        <Col span={12} style={{ border: "1px solid blue" }}>
          <Col xs={24} sm={22} style={{ margin: "10px 0" }}>
            <Input
              size="large"
              value={searchTerm}
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={22}>
            <label>Filter by User Role</label>
            <Select
              onChange={handleRoleChange}
              size={"large"}
              options={roleOptionsFilter as SelectOptions[]}
              value={selectRole}
              style={{ width: "100%" }}
              placeholder={"Select role"}
            />
          </Col>
        </Col>
        <div style={{ marginBottom: "10px", border: "1px solid red" }}>
          <Link href={`/${role}/${routeName}/create-admin`}>
            <Button type="primary" style={{ margin: "2px" }}>
              Create Admin
            </Button>
          </Link>
          <Link href={`/${role}/${routeName}/create-user`}>
            <Button type="primary" style={{ margin: "2px" }}>
              Create User
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm || !!selectRole) && (
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

export default ManageUserPage;
