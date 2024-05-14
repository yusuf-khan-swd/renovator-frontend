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
      label: (
        <DashboardLink pageRoute="manage-users">Manage Users</DashboardLink>
      ),
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-users`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <DashboardLink pageRoute="manage-categories">
          Manage Categories
        </DashboardLink>
      ),
      icon: <ControlOutlined />,
      key: `/${role}/manage-categories`,
    },
    {
      label: (
        <DashboardLink pageRoute="manage-services">
          Manage Services
        </DashboardLink>
      ),
      icon: <ContainerOutlined />,
      key: `/${role}/manage-services`,
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
    {
      label: (
        <DashboardLink pageRoute="manage-feedbacks">
          Manage Feedbacks
        </DashboardLink>
      ),
      icon: <MailOutlined />,
      key: `/${role}/manage-feedbacks`,
    },
    {
      label: "Manage Content",
      key: `manage-contents`,
      icon: <UnorderedListOutlined />,
      children: [
        {
          label: (
            <DashboardLink pageRoute="manage-contents/blog">Blog</DashboardLink>
          ),
          key: `/${role}/blog`,
        },
        {
          label: (
            <DashboardLink pageRoute="manage-contents/faq">FAQ</DashboardLink>
          ),
          key: `/${role}/faq`,
        },
        {
          label: (
            <DashboardLink pageRoute="manage-contents/about">
              About Us
            </DashboardLink>
          ),
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
