"use client";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

import DashboardLink from "@/components/DashboardLink";
import ActionBar from "@/components/ui/ActionBar";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalManageContentBody from "@/components/ui/ConfirmModalManageContentBody";
import ConfirmModalTitle from "@/components/ui/ConfirmModalTitle";
import getWordFromString from "@/helpers/getWordFromString";
import {
  useBlogsQuery,
  useDeleteBlogMutation,
} from "@/redux/api/content/blogApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageBlog = () => {
  const { role } = getUserInfo() as any;
  const routeLabel = "manage-blog";
  const routeUrl = "manage-contents/blog";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteBlog] = useDeleteBlogMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    query: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useBlogsQuery(undefined);

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteBlog(id);

      if (result?.data) message.success("Blog Deleted successfully");
      else message.error("Blog Delete failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const columns = [
    {
      title: "S/N",
      width: 60,
      render: function (text: any, record: any, index: number) {
        return index + 1;
      },
    },
    {
      title: "Title",
      width: 140,
      dataIndex: "title",
      render: function (title: string) {
        const shortTitle = getWordFromString(title, 7);
        return shortTitle;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: function (description: string) {
        const shortDescription = getWordFromString(description, 80);
        return shortDescription;
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
      title: "Action",
      width: 140,
      render: function (data: any) {
        return (
          <>
            <DashboardLink pageRoute={`${routeUrl}/edit/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </DashboardLink>
            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title={<ConfirmModalTitle data="blog" />}
              content={<ConfirmModalManageContentBody data={data} />}
            />
          </>
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

  return (
    <div>
      <CommonBreadCrumb items={[{ label: routeLabel, link: routeUrl }]} />

      <ActionBar title="Blog List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href={`/${role}/${routeUrl}/create`}>
            <Button type="primary">Create</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "2px" }}
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

export default ManageBlog;
