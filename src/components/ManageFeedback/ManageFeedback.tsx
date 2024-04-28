"use client";

import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import getWordFromString from "@/helpers/getWordFromString";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import { useDebounced } from "@/redux/hooks";
import { EditOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import DashboardLink from "../DashboardLink";
import ConfirmModalFeedbackContent from "../ui/ConfirmModalFeedbackContent";
import ConfirmModalTitle from "../ui/ConfirmModalTitle";

const ManageFeedback = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteFeedback] = useDeleteFeedbackMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    query: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useFeedbacksQuery(undefined);

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteFeedback(id);

      if (result?.data) message.success("Feedback Delete successfully");
      else message.error("Feedback Delete failed!");
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
      title: "Feedback",
      dataIndex: "review",
      height: 340,
      render: function (review: string) {
        const shortReview = getWordFromString(review, 40);
        return shortReview;
      },
    },
    {
      title: "Rating",
      width: 70,
      dataIndex: "rating",
    },
    {
      title: "User Name",
      width: 140,
      dataIndex: "name",
      render: function (name: string) {
        return name;
      },
    },
    {
      title: "User Email",
      width: 140,
      dataIndex: "email",
      render: function (email: any) {
        const ellipsisEmail =
          email?.length <= 17 ? email : email?.slice(0, 15) + "...";
        return (
          <Tooltip title={email}>
            <span>{ellipsisEmail}</span>
          </Tooltip>
        );
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
      width: 180,
      render: function (data: any) {
        return (
          <div style={{ display: "flex" }}>
            <DashboardLink pageRoute={`${routeName}/view/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </DashboardLink>
            <DashboardLink pageRoute={`${routeName}/edit/${data?.id}`}>
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
              title={<ConfirmModalTitle data="feedback" />}
              content={<ConfirmModalFeedbackContent data={data} />}
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

  const routeName = "manage-feedbacks";

  return (
    <div>
      <CommonBreadCrumb items={[{ label: routeName, link: routeName }]} />

      <ActionBar title="Feedback List">
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
        alignTopRow
      />
    </div>
  );
};

export default ManageFeedback;
