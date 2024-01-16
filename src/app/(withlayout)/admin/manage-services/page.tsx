"use client";
import ActionBar from "@/components/ui/ActionBar";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalServiceContent from "@/components/ui/ConfirmModalServiceContent";
import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageServicePage = () => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-services";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteService] = useDeleteServiceMutation();

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
  const { data, isLoading } = useServicesQuery({ ...query });

  const services = data?.services;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const result: any = await deleteService(id);
      if (result?.data) {
        message.success("Service Delete successfully");
      } else {
        message.error("Service Delete failed!");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      sorter: true,
      render: function (data: string) {
        return data.length <= 30 ? data : data.slice(0, 30) + "...";
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: function (data: any) {
        return data?.title.length <= 25
          ? data?.title
          : data?.title.slice(0, 22) + "...";
      },
    },
    {
      title: "Price",
      width: 80,
      dataIndex: "price",
      render: function (data: number) {
        return "$" + data;
      },
      sorter: true,
    },
    {
      title: "Status",
      width: 100,
      dataIndex: "status",
      render: function (status: string) {
        const color =
          status === ENUM_SERVICE_STATUS.AVAILABLE ? "green" : "blue";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      sorter: true,
    },
    {
      title: "Location",
      width: 100,
      dataIndex: "location",
      render: function (location: string) {
        const capitalizeLocation =
          location.charAt(0).toUpperCase() + location.slice(1);
        return capitalizeLocation;
      },
      sorter: true,
    },
    ,
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
      render: function (data: any) {
        return (
          <div style={{ display: "flex" }}>
            <Link href={`/${role}/manage-services/details/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/${routeName}/edit/${data?.id}`}>
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
              title="Do you want to delete this service?"
              content={<ConfirmModalServiceContent service={data} />}
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

      <ActionBar title="Service List">
        <Input
          type="text"
          size="large"
          placeholder="Service name..."
          value={searchTerm}
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href={`/${role}/${routeName}/create`}>
            <Button type="primary">Create</Button>
          </Link>
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
        dataSource={services}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageServicePage;
