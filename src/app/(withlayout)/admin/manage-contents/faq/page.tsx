"use client";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import CommonTable from "@/components/ui/CommonTable";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteFaqMutation, useFaqsQuery } from "@/redux/api/content/faqApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ACDepartmentPage = () => {
  const { role } = getUserInfo() as any;
  const routeLabel = "manage-faq";
  const routeUrl = "manage-contents/faq";

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [deleteFaq] = useDeleteFaqMutation();

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
  const { data, isLoading } = useFaqsQuery(undefined);

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      const res = await deleteFaq(id);
      if (res) {
        message.success("Faq Deleted successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
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
      title: "Title",
      width: 140,
      dataIndex: "title",
      render: function (title: string) {
        const uptoWordCount = 7;

        // Make array of string using empty string and take 7 word
        const splitTitle = title.split(" ");
        const sliceSplitTitle = splitTitle.slice(0, uptoWordCount);

        // And add ellipsis if word length is greater then uptoWordCount
        const shortTitle =
          splitTitle.length <= uptoWordCount
            ? splitTitle.join(" ")
            : sliceSplitTitle.join(" ") + "...";

        return shortTitle;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: function (description: string) {
        const uptoWordCount = 80;

        // make array of string with empty string for word then take 60 words
        const splitDescription = description.split(" ");
        const sliceSplitDescription = splitDescription.slice(0, uptoWordCount);

        // Check array of words length is less then uptoWordCount if not then add ellipsis
        const shortDescription =
          splitDescription.length <= uptoWordCount
            ? splitDescription.join(" ")
            : sliceSplitDescription.join(" ") + "...";

        return shortDescription;
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
      width: 140,
      render: function (data: any) {
        return (
          <>
            <Link href={`/${role}/${routeUrl}/edit/${data?.id}`}>
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
              title="Do you want to delete this blog?"
              content={`Delete ${data?.title} blog!`}
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
        items={[{ label: routeLabel, link: `/${role}/${routeUrl}` }]}
      />

      <ActionBar title="Faq List">
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
          <Link href={`/${role}/${routeUrl}/create`}>
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

export default ACDepartmentPage;
