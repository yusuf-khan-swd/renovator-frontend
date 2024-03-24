"use client";

import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useAdminUsersQuery, useDeleteUserMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import CommonManageUserTable from "./CommonManageUserTable";

const ManageAdminUser = () => {
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useAdminUsersQuery(undefined);

  const deleteUserHandler = async (id: string) => {
    try {
      message.loading("Deleting...");

      const result: any = await deleteUser(id);

      if (result?.data) message.success("User Successfully Deleted!");
      else message.error("User Delete Failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: function (name: string) {
        const shortName = name.length <= 23 ? name : name.slice(0, 20) + "...";
        return shortName;
      },
    },
    {
      title: "Email",
      width: 180,
      dataIndex: "email",
      render: function (email: string) {
        const shortEmail =
          email.length <= 23 ? email : email.slice(0, 20) + "...";
        return shortEmail;
      },
    },

    {
      title: "Role",
      width: 80,
      dataIndex: "role",
      render: function (role: string) {
        return <Tag color="blue">{role}</Tag>;
      },
    },
    {
      title: "CreatedAt",
      width: 170,
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "UpdatedAt",
      width: 170,
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div style={{ display: "flex" }}>
            <Link href={`/${role}/${routeName}/details/${data?.id}`}>
              <Button
                onClick={() => console.log(data)}
                type="primary"
                style={{ margin: "2px" }}
              >
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/${routeName}/edit/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data?.id)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

            <ConfirmModal
              id={data?.id}
              handler={deleteUserHandler}
              title="Do you want to remove this user?"
              content={
                <div>
                  <p>
                    Name:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.name}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.email}</span>
                  </p>
                </div>
              }
            />
          </div>
        );
      },
    },
  ];

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
  const routeName = "manage-admins";

  console.log({ adminUser: page });

  return (
    <div>
      <CommonManageUserTable
        data={data}
        isLoading={isLoading}
        pageRoute={routeName}
        setPage={setPage}
      />

      <CommonBreadCrumb
        items={[
          {
            label: routeName,
            link: `/${role}/${routeName}`,
          },
        ]}
      />
      <ActionBar title="User List">
        <Input
          size="large"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
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
        columns={columns}
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

export default ManageAdminUser;
