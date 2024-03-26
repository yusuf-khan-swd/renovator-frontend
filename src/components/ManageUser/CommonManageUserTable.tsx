"use client";

import CommonTable from "@/components/ui/CommonTable";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tag, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

// setPage,
// setSize,
// setSortBy,
// setSortOrder,

// this is useStates Types of setPage, setSize, setSortBy, setSortOrder
// setPage: (value: SetStateAction<number>) => void;
// setSize: (value: SetStateAction<number>) => void;
// setSortBy: (value: SetStateAction<string>) => void;
// setSortOrder: (value: SetStateAction<string>) => void;

// or this is useStates Types of setPage, setSize, setSortBy, setSortOrder
// setPage: Dispatch<SetStateAction<number>>;
// setSize: Dispatch<SetStateAction<number>;>;
// setSortBy: Dispatch<SetStateAction<string>;>;
// setSortOrder: Dispatch<SetStateAction<string>;>

const CommonManageUserTable = ({
  data,
  isLoading,
  pageRoute,
  setPage,
  setSize,
  size,
  setSortBy,
  setSortOrder,
}: {
  data: any;
  isLoading: boolean;
  pageRoute: string;
  setPage: any;
  setSize: any;
  size: any;
  setSortBy: any;
  setSortOrder: any;
}) => {
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async (id: string) => {
    try {
      message.loading("Deleting...");

      const result: any = await deleteUser(id);

      if (result?.data) message.success("User Successfully Deleted!");
      else message.error("User Delete Failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const { role } = getUserInfo() as any;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: function (name: string) {
        const shortName = name.length <= 23 ? name : name.slice(0, 20) + "...";
        return shortName;
      },
    },
    {
      title: "Email",
      width: 180,
      dataIndex: "email",
      render: function (email: string) {
        const shortEmail =
          email.length <= 23 ? email : email.slice(0, 20) + "...";
        return shortEmail;
      },
    },

    {
      title: "Role",
      width: 80,
      dataIndex: "role",
      render: function (role: string) {
        return <Tag color="blue">{role}</Tag>;
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
      title: "UpdatedAt",
      width: 170,
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div style={{ display: "flex" }}>
            <Link href={`/${role}/${routeName}/details/${data?.id}`}>
              <Button
                onClick={() => console.log(data)}
                type="primary"
                style={{ margin: "2px" }}
              >
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${role}/${routeName}/edit/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data?.id)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

            <ConfirmModal
              id={data?.id}
              handler={deleteUserHandler}
              title="Do you want to remove this user?"
              content={
                <div>
                  <p>
                    Name:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.name}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.email}</span>
                  </p>
                </div>
              }
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

  const routeName = pageRoute;

  return (
    <div>
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

export default CommonManageUserTable;
