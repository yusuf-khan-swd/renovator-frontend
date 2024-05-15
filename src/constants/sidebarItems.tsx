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
      label: <DashboardLink route="manage-cart">Manage Cart</DashboardLink>,
      icon: <ShoppingCartOutlined />,
      key: `/${role}/manage-cart`,
    },
    {
      label: (
        <DashboardLink route="manage-bookings">Manage Bookings</DashboardLink>
      ),
      icon: <CheckSquareOutlined />,
      key: `/${role}/manage-bookings`,
    },
    {
      label: (
        <DashboardLink route="manage-reviews">Manage Reviews</DashboardLink>
      ),
      icon: <FontSizeOutlined />,
      key: `/${role}/manage-reviews`,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <DashboardLink route="manage-users">Manage Users</DashboardLink>,
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-users`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: (
        <DashboardLink route="manage-categories">
          Manage Categories
        </DashboardLink>
      ),
      icon: <ControlOutlined />,
      key: `/${role}/manage-categories`,
    },
    {
      label: (
        <DashboardLink route="manage-services">Manage Services</DashboardLink>
      ),
      icon: <ContainerOutlined />,
      key: `/${role}/manage-services`,
    },
    {
      label: (
        <DashboardLink route="manage-bookings">Manage Bookings</DashboardLink>
      ),
      icon: <CheckSquareOutlined />,
      key: `/${role}/manage-bookings`,
    },
    {
      label: (
        <DashboardLink route="manage-reviews">Manage Reviews</DashboardLink>
      ),
      icon: <FontSizeOutlined />,
      key: `/${role}/manage-reviews`,
    },
    {
      label: (
        <DashboardLink route="manage-feedbacks">Manage Feedbacks</DashboardLink>
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
            <DashboardLink route="manage-contents/blog">Blog</DashboardLink>
          ),
          key: `/${role}/blog`,
        },
        {
          label: <DashboardLink route="manage-contents/faq">FAQ</DashboardLink>,
          key: `/${role}/faq`,
        },
        {
          label: (
            <DashboardLink route="manage-contents/about">
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
      label: <DashboardLink route="manage-admins">Manage Admins</DashboardLink>,
      icon: <UsergroupAddOutlined />,
      key: `/${role}/manage-admins`,
    },
    {
      label: (
        <DashboardLink route="manage-normal-users">
          Manage Normal Users
        </DashboardLink>
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
