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

import type { MenuProps } from "antd";
import Link from "next/link";
import { ENUM_USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/manage-cart`}>Manage Cart</Link>,
      icon: <ShoppingCartOutlined />,
      key: `/${role}/manage-cart`,
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
      key: `/${role}/manage-contents`,
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
  ];

  if (role === ENUM_USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === ENUM_USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === ENUM_USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
