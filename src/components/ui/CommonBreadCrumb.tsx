import { Breadcrumb } from "antd";
import {
  BreadCrumbHomeLink,
  CommonBreadCrumbRoleLink,
} from "../CommonBreadCrumbLinks";
import DashboardLink from "../DashboardLink";

interface CommonBreadCrumbProps {
  items?: {
    label: string;
    link: string;
  }[];
}

const CommonBreadCrumb = ({ items }: CommonBreadCrumbProps) => {
  const breadCrumbItems = [
    {
      title: <BreadCrumbHomeLink />,
    },
    {
      title: <CommonBreadCrumbRoleLink />,
    },
  ];

  if (items && items?.length > 0) {
    breadCrumbItems.push(
      ...items.map((item) => {
        return {
          title: item.link ? (
            <DashboardLink pageRoute={`${item.link}`}>
              {item.label}
            </DashboardLink>
          ) : (
            <span>{item.label}</span>
          ),
        };
      })
    );
  }

  return <Breadcrumb items={breadCrumbItems} />;
};

export default CommonBreadCrumb;
