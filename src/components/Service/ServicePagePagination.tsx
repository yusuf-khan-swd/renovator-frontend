import { Pagination } from "antd";

const ServicePagePagination = () => {
  const meta = { total: 20 };
  const size = 5;
  const onPaginationChange = () => {};

  return (
    <div style={{ textAlign: "center", margin: "10px 0" }}>
      ServicePagePagination
      <Pagination
        total={meta?.total}
        defaultPageSize={size}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default ServicePagePagination;
