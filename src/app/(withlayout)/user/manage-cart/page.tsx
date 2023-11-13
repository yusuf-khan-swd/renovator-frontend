"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmBookingModal from "@/components/ui/ConfirmBookingModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCartsQuery, useDeleteCartMutation } from "@/redux/api/cartApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const ManageCartPage = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-cart";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteCart] = useDeleteCartMutation();
  const [createBooking] = useCreateBookingMutation();

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
  const { data, isLoading } = useCartsQuery(undefined);
  // console.log(data);

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      await deleteCart(id);
      message.success("Cart Delete successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const handleBooking = async (data: any) => {
    try {
      message.loading("Service Booking...");
      const result: any = await createBooking(data);
      if (result?.data) {
        message.success("Service booked successfully!!");
      } else {
        message.error("Service booking failed!");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      render: function (service: IService) {
        return service.title.slice(0, 25) + "...";
      },
    },
    {
      title: "Service Status",
      dataIndex: "service",
      render: function (service: IService) {
        return service.status;
      },
    },
    {
      title: "Service Price",
      dataIndex: "service",
      render: function (service: IService) {
        return "$" + service.price;
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
            <ConfirmBookingModal
              id={data.service.id}
              handleBooking={handleBooking}
            />
            <ConfirmModal
              id={data?.id}
              handler={deleteHandler}
              title="Do you want to delete this item from cart?"
              content={`Delete this item from cart!`}
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

      <ActionBar title="Cart List">
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

export default ManageCartPage;
