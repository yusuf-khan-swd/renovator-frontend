"use client";

import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import {
  useAdminReviewsQuery,
  useDeleteReviewMutation,
  useUserReviewsQuery,
} from "@/redux/api/reviewApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { EditOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DashboardLink from "../DashboardLink";
import ConfirmModalReviewContent from "../ui/ConfirmModalReviewContent";
import ConfirmModalTitle from "../ui/ConfirmModalTitle";

const ManageReviewPage = () => {
  const { role, userId } = getUserInfo() as any;
  const routeName = "manage-reviews";

  const [roleBaseReviews, setRoleBaseReviews] = useState();

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteReview] = useDeleteReviewMutation();

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
  const { data: userReviewsData, isLoading: isLoadingUserReview } =
    useUserReviewsQuery(userId);

  const { data: adminReviewsData, isLoading: isLoadingAdminReviews } =
    useAdminReviewsQuery(undefined);

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const result: any = await deleteReview(id);

      if (result?.data) {
        message.success("Review Delete successfully");
      } else {
        message.error("Review Delete failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      width: 170,
      dataIndex: "service",
      render: function (service: IService) {
        const title = service?.title;
        return title.length <= 25 ? title : title.slice(0, 22) + "...";
      },
    },
    {
      title: "Price",
      width: 70,
      dataIndex: "service",
      render: function (service: IService) {
        return "$" + service?.price;
      },
      sorter: true,
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "service",
      render: function (service: IService) {
        const status = service?.status;
        const color =
          status === ENUM_SERVICE_STATUS.AVAILABLE ? "green" : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Review",
      width: 175,
      dataIndex: "review",
      render: function (data: string) {
        return data.length <= 25 ? data : data.slice(0, 22) + "...";
      },
    },
    {
      title: "Rating",
      width: 70,
      dataIndex: "rating",
    },
    {
      title: "User Email",
      width: 140,
      dataIndex: "user",
      render: function (user: any) {
        const email = user?.email;
        return email?.length <= 17 ? email : email?.slice(0, 15) + "...";
      },
    },
    {
      title: "CreatedAt",
      width: 120,
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
      sorter: true,
    },
    {
      title: "Action",
      width: 180,
      render: function (data: any) {
        return (
          <div style={{ display: "flex" }}>
            <DashboardLink route={`${routeName}/view/${data?.id}`}>
              <Button
                style={{
                  margin: "2px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </DashboardLink>

            <DashboardLink route={`${routeName}/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "2px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </DashboardLink>

            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title={<ConfirmModalTitle data="review" />}
              content={<ConfirmModalReviewContent data={data} />}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (role === "user") {
      setRoleBaseReviews(userReviewsData);
    } else if (role === "admin") {
      setRoleBaseReviews(adminReviewsData);
    }
  }, [
    role,
    userReviewsData,
    isLoadingUserReview,
    adminReviewsData,
    isLoadingAdminReviews,
  ]);

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
      <CommonBreadCrumb items={[{ label: routeName, link: routeName }]} />

      <ActionBar title="Review List">
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
        loading={isLoadingUserReview || isLoadingAdminReviews}
        columns={columns}
        dataSource={roleBaseReviews}
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

export default ManageReviewPage;
