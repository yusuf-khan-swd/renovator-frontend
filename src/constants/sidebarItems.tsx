import {
  CheckSquareOutlined,
  ContainerOutlined,
  ControlOutlined,
  FontSizeOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import DashboardLink from "@/components/DashboardLink";
import type { MenuProps } from "antd";
import Link from "next/link";
import { ENUM_USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <DashboardLink>Profile</DashboardLink>,
      key: "profile",
      icon: <UserOutlined />,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <DashboardLink pageRoute="manage-cart">Manage Cart</DashboardLink>,
      icon: <ShoppingCartOutlined />,
      key: `/${role}/manage-cart`,
    },
    {
      label: (
        <DashboardLink pageRoute="manage-bookings">
          Manage Bookings
        </DashboardLink>
      ),
      icon: <CheckSquareOutlined />,
      key: `/${role}/manage-bookings`,
    },
    {
      label: (
        <DashboardLink pageRoute="manage-reviews">Manage Reviews</DashboardLink>
      ),
      icon: <FontSizeOutlined />,
      key: `/${role}/manage-reviews`,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-users`}>Manage Users</Link>,
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-users`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/manage-categories`}>Manage Categories</Link>,
      icon: <ControlOutlined />,
      key: `/${role}/manage-categories`,
    },
    {
      label: <Link href={`/${role}/manage-services`}>Manage Services</Link>,
      icon: <ContainerOutlined />,
      key: `/${role}/manage-services`,
    },
    {
      label: <Link href={`/${role}/manage-bookings`}>Manage Bookings</Link>,
      icon: <CheckSquareOutlined />,
      key: `/${role}/manage-bookings`,
    },
    {
      label: <Link href={`/${role}/manage-reviews`}>Manage Reviews</Link>,
      icon: <FontSizeOutlined />,
      key: `/${role}/manage-reviews`,
    },
    {
      label: <Link href={`/${role}/manage-feedbacks`}>Manage Feedbacks</Link>,
      icon: <MailOutlined />,
      key: `/${role}/manage-feedbacks`,
    },
    {
      label: "Manage Content",
      key: `manage-contents`,
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: <Link href={`/${role}/manage-contents/blog`}>Blog</Link>,
          key: `/${role}/blog`,
        },
        {
          label: <Link href={`/${role}/manage-contents/faq`}>FAQ</Link>,
          key: `/${role}/faq`,
        },
        {
          label: <Link href={`/${role}/manage-contents/about`}>About Us</Link>,
          key: `/${role}/about`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/manage-admins`}>Manage Admins</Link>,
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-admins`,
    },
    {
      label: (
        <Link href={`/${role}/manage-normal-users`}>Manage Normal Users</Link>
      ),
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-normal-users`,
    },
  ];

  if (role === ENUM_USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === ENUM_USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === ENUM_USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
