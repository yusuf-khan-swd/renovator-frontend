"use client";

import { getUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

const CommonBreadCrumb = ({
  items,
}: {
  items?: {
    label: string;
    link: string;
  }[];
}) => {
  const { role }: { role: string } = getUserInfo() as any;

  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: <Link href={`/${role}`}>{role}</Link>,
    },
  ];

  if (items && items?.length > 0) {
    breadCrumbItems.push(
      ...items.map((item) => {
        return {
          title: item.link ? (
            <Link href={item.link}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          ),
        };
      })
    );
  }

  return <Breadcrumb items={breadCrumbItems}></Breadcrumb>;
};

export default CommonBreadCrumb;
