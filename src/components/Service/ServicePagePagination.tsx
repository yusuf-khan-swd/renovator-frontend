import { Pagination } from "antd";

const ServicePagePagination = () => {
  const meta = { total: 10 };
  const size = 5;
  const onPaginationChange = () => {};

  return (
    <Pagination
      total={meta?.total}
      defaultPageSize={size}
      onChange={onPaginationChange}
    />
  );
};

export default ServicePagePagination;
