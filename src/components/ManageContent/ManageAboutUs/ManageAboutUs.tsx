"use client";

import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalManageContentBody from "@/components/ui/ConfirmModalManageContentBody";
import ConfirmModalTitle from "@/components/ui/ConfirmModalTitle";
import getWordFromString from "@/helpers/getWordFromString";
import {
  useDeleteAboutUsMutation,
  useGetAllAboutUsQuery,
} from "@/redux/api/content/aboutUsApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageAboutUs = () => {
  const { role } = getUserInfo() as any;
  const routeLabel = "manage-about";
  const routeUrl = "manage-contents/about";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteAboutUs] = useDeleteAboutUsMutation();

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
  const { data, isLoading } = useGetAllAboutUsQuery(undefined);

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteAboutUs(id);

      if (result?.data) message.success("AboutUs Deleted successfully");
      else message.error("AboutUs Delete failed!");
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
            <Link href={`/${role}/${routeUrl}/edit/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title={<ConfirmModalTitle data="about us" />}
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
      <CommonBreadCrumb
        items={[{ label: routeLabel, link: `/${role}/${routeUrl}` }]}
      />

      <ActionBar title="AboutUs List">
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

export default ManageAboutUs;
