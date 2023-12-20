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
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

// TODO: Update cancel modal in user
// TODO: Update confirm delete modal content user

const ManageBookingPage = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-bookings";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
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

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteBooking(id);

      if (result?.data) {
        message.success("Booking Delete successfully!");
      } else {
        message.error("Booking Delete failed");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      render: function (service: IService) {
        return service?.title.length <= 25
          ? service?.title
          : service?.title.slice(0, 25) + "...";
      },
    },
    {
      title: "Price",
      dataIndex: "service",
      render: function (service: IService) {
        return "$" + service?.price;
      },
    },
    {
      title: "Booking Date",
      dataIndex: "date",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: function (data: string) {
        const statusColor = `${
          data === ENUM_BOOKING_STATUS.ACCEPT
            ? "green"
            : data === ENUM_BOOKING_STATUS.PENDING
            ? "blue"
            : "red"
        }`;

        return (
          <p style={{ color: statusColor }}>
            {data.charAt(0).toUpperCase() + data.slice(1)}
          </p>
        );
      },
    },

    {
      title: "User Email",
      dataIndex: "user",
      render: function (data: any) {
        return data.email;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
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
        items={[
          { label: role, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
        ]}
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

export default ManageBookingPage;
