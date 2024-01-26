"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import ConfirmModalFeedbackContent from "../ui/ConfirmModalFeedbackContent";
import ConfirmModalTitle from "../ui/ConfirmModalTitle";

const ManageFeedback = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-feedbacks";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
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

  console.log(data);

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const result: any = await deleteFeedback(id);

      if (result?.data) {
        message.success("Feedback Delete successfully");
      } else {
        message.error("Feedback Delete failed!");
      }
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
      title: "Review",
      dataIndex: "review",
      render: function (review: string) {
        const uptoWordCount = 40;

        // make array of string with empty string for word then take 60 words
        const splitReview = review.split(" ");
        const sliceSplitReview = splitReview.slice(0, uptoWordCount);

        // Check array of words length is less then uptoWordCount if not then add ellipsis
        const shortDescription =
          splitReview.length <= uptoWordCount
            ? splitReview.join(" ")
            : sliceSplitReview.join(" ") + "...";

        return shortDescription;
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
        const uptoWordCount = 3;

        // make array of string with empty string for word then take 60 words
        const splitName = name.split(" ");
        const sliceSplitName = splitName.slice(0, uptoWordCount);

        // Check array of words length is less then uptoWordCount if not then add ellipsis
        const shortName =
          splitName.length <= uptoWordCount
            ? splitName.join(" ")
            : sliceSplitName.join(" ") + "...";

        return shortName;
      },
    },
    {
      title: "User Email",
      width: 140,
      dataIndex: "email",
      render: function (email: any) {
        return email?.length <= 22 ? email : email?.slice(0, 17) + "...";
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
            <Link href={`/${role}/${routeName}/view/${data?.id}`}>
              <Button
                style={{
                  margin: "2px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </Link>

            <Link href={`/${role}/${routeName}/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "2px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

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

  return (
    <div>
      <CommonBreadCrumb
        items={[{ label: routeName, link: `/${role}/${routeName}` }]}
      />

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
      />
    </div>
  );
};

export default ManageFeedback;
