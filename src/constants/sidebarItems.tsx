import { TableOutlined, UserOutlined } from "@ant-design/icons";
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
      icon: <TableOutlined />,
      key: `/${role}/manage-cart`,
    },
    {
      label: <Link href={`/${role}/manage-bookings`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-bookings`,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-users`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-users`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/manage-categories`}>Manage Categories</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-categories`,
    },
    {
      label: <Link href={`/${role}/manage-services`}>Manage Services</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-services`,
    },
    {
      label: <Link href={`/${role}/manage-bookings`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-bookings`,
    },
    {
      label: "Manage Content",
      key: `/${role}/manage-contents`,
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/manage-contents/blog`}>Blog</Link>,
          key: `/${role}/blog`,
        },
        {
          label: <Link href={`/${role}/manage-contents/faq`}>FAQ</Link>,
          key: `/${role}/faq`,
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
