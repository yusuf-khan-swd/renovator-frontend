"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalBookingContent from "@/components/ui/ConfirmModalBookingContent";
import {
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
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

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

  const handleCancelBooking = async (id: any) => {
    const data = {
      id: id,
      status: ENUM_BOOKING_STATUS_FOR_USER.CANCEL,
    };
    try {
      message.loading("Cancelling.....");
      const result: any = await updateBooking(data);
      if (result?.data) {
        message.success("Booking Cancelled Successful!");
      } else {
        message.error("Booking Cancelled Failed!");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const handleRequestBooking = async (id: any) => {
    const data = {
      id: id,
      status: ENUM_BOOKING_STATUS_FOR_USER.PENDING,
    };
    try {
      message.loading("Requesting.....");
      const result: any = await updateBooking(data);
      if (result?.data) {
        message.success("Booking Requested Successful!");
      } else {
        message.error("Booking Requested Failed!");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      //   console.log(data);
      await deleteBooking(id);
      message.success("Booking Delete successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
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
    },

    {
      title: "User Email",
      dataIndex: "user",
      render: function (data: any) {
        return data.email;
      },
      sorter: true,
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
