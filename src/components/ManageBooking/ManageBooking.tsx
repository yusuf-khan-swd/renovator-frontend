"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalBookingContent from "@/components/ui/ConfirmModalBookingContent";
import {
  ENUM_BOOKING_STATUS,
  ENUM_BOOKING_STATUS_FOR_ADMIN,
  ENUM_BOOKING_STATUS_FOR_USER,
} from "@/constants/bookingStatus";
import {
  useBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageBooking = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-bookings";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();

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
  const { data, isLoading } = useBookingsQuery(undefined);

  const handleRejectBooking = async (id: any) => {
    try {
      const data = {
        id: id,
        status: ENUM_BOOKING_STATUS_FOR_ADMIN.REJECT,
      };
      message.loading("Rejecting.....");

      const result: any = await updateBooking(data);

      if (result?.data) {
        message.success("Booking rejected successfully");
      } else {
        message.error("Booking rejected failed");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const handleConfirmBooking = async (id: any) => {
    try {
      const data = {
        id: id,
        status: ENUM_BOOKING_STATUS_FOR_ADMIN.ACCEPT,
      };

      message.loading("Confirming.....");

      const result: any = await updateBooking(data);

      if (result?.data) {
        message.success("Booking confirmed successfully!");
      } else {
        message.error("Booking confirmed failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const handleCancelBooking = async (id: any) => {
    try {
      message.loading("Cancelling.....");

      const data = {
        id: id,
        status: ENUM_BOOKING_STATUS_FOR_USER.CANCEL,
      };

      const result: any = await updateBooking(data);

      if (result?.data) {
        message.success("Booking Cancelled Successful!");
      } else {
        message.error("Booking Cancelled Failed!");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err?.message);
    }
  };

  const handleRequestBooking = async (id: any) => {
    try {
      message.loading("Requesting.....");

      const data = {
        id: id,
        status: ENUM_BOOKING_STATUS_FOR_USER.PENDING,
      };

      const result: any = await updateBooking(data);

      if (result?.data) {
        message.success("Booking Requested Successful!");
      } else {
        message.error("Booking Requested Failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteBooking(id);

      if (result?.data) {
        message.success("Booking Delete successfully");
      } else {
        message.error("Booking Delete failed");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      render: function (service: IService) {
        const title = service?.title;
        return title.length <= 25 ? title : title.slice(0, 22) + "...";
      },
    },
    {
      title: "Price",
      width: 80,
      dataIndex: "service",
      render: function (service: IService) {
        return "$" + service?.price;
      },
    },
    {
      title: "Booking Date",
      width: 110,
      dataIndex: "date",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
    },
    {
      title: "Status",
      width: 90,
      dataIndex: "status",
      render: function (bookingStatus: string) {
        const bookingStatusColor = `${
          bookingStatus === ENUM_BOOKING_STATUS.ACCEPT
            ? "green"
            : bookingStatus === ENUM_BOOKING_STATUS.PENDING
            ? "blue"
            : "red"
        }`;

        return (
          <Tag color={bookingStatusColor}>{bookingStatus.toUpperCase()}</Tag>
        );
      },
    },
    {
      title: "User Email",
      width: 140,
      dataIndex: "user",
      render: function (user: any) {
        const email = user?.email;
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
    },
  ];

  if (role === "user") {
    columns.push({
      title: "Action",
      dataIndex: "",
      width: 240,
      render: function (data: any) {
        return (
          <>
            <ConfirmModal
              id={data?.id}
              handler={handleRequestBooking}
              title={
                <p>
                  Do you want to <span style={{ color: "green" }}>Request</span>{" "}
                  again this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
              button
              buttonName="Request"
              buttonType="primary"
              disabled={
                data?.status === ENUM_BOOKING_STATUS_FOR_USER.PENDING ||
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.ACCEPT ||
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.REJECT
                  ? true
                  : false
              }
            />
            <ConfirmModal
              id={data?.id}
              handler={handleCancelBooking}
              title={
                <p>
                  Do you want to <span style={{ color: "red" }}>Cancel</span>{" "}
                  this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
              button
              buttonType="default"
              disabled={
                data?.status === ENUM_BOOKING_STATUS_FOR_USER.CANCEL ||
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.ACCEPT ||
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.REJECT
                  ? true
                  : false
              }
            />

            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title={
                <p>
                  Do you want to <span style={{ color: "red" }}>Delete</span>{" "}
                  this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
            />
          </>
        );
      },
    });
  } else if (role === "admin") {
    columns.push({
      title: "Action",
      dataIndex: "",
      width: 280,
      render: function (data: any) {
        return (
          <>
            <ConfirmModal
              id={data?.id}
              handler={handleConfirmBooking}
              title={
                <p>
                  Do you want to <span style={{ color: "green" }}>ACCEPT</span>{" "}
                  this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
              button
              buttonName="Accept"
              buttonType="primary"
              disabled={
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.ACCEPT ||
                data?.status === ENUM_BOOKING_STATUS_FOR_USER.CANCEL
                  ? true
                  : false
              }
            />
            <ConfirmModal
              id={data?.id}
              handler={handleRejectBooking}
              title={
                <p>
                  Do you want to <span style={{ color: "red" }}>REJECT</span>{" "}
                  this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
              button
              buttonName="Reject"
              buttonType="default"
              disabled={
                data?.status === ENUM_BOOKING_STATUS_FOR_ADMIN.REJECT ||
                data?.status === ENUM_BOOKING_STATUS_FOR_USER.CANCEL
                  ? true
                  : false
              }
            />

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
              title={
                <p>
                  Do you want to <span style={{ color: "red" }}>Delete</span>{" "}
                  this booking
                </p>
              }
              content={<ConfirmModalBookingContent data={data} />}
            />
          </>
        );
      },
    });
  }

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

      <ActionBar title="Booking List">
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
              style={{ margin: "0px 5px" }}
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

export default ManageBooking;
