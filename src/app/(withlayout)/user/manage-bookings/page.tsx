"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { ENUM_BOOKING_STATUS_FOR_USER } from "@/constants/bookingStatus";
import {
  useBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
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
    searchQuery: searchTerm,
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
      console.log(data);
      await updateBooking(data);
      message.success("Booking Cancelled successfully");
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
      render: function (data: any) {
        return data.title;
      },
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "service",
      render: function (data: any) {
        return data.price;
      },
      sorter: true,
    },
    {
      title: "Booking Date",
      dataIndex: "date",
      sorter: true,
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
              handler={handleCancelBooking}
              title="Do you want to cancel this booking"
              button
              buttonType="primary"
              disabled={
                data?.status === ENUM_BOOKING_STATUS_FOR_USER.CANCEL
                  ? true
                  : false
              }
            />
            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title="Do you want to delete this booking?"
              content={`Delete this booking!`}
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
