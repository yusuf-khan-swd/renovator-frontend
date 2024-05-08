import { Breadcrumb } from "antd";
import { BreadCrumbHomeLink, BreadCrumbRoleLink } from "../BreadCrumbLinks";
import DashboardLink from "../DashboardLink";

const CommonBreadCrumb = ({
  items,
}: {
  items?: {
    label: string;
    link: string;
  }[];
}) => {
  const breadCrumbItems = [
    {
      title: <BreadCrumbHomeLink />,
    },
    {
      title: <BreadCrumbRoleLink />,
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
