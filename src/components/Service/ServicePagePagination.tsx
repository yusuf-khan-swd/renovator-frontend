import { Pagination } from "antd";

const ServicePagePagination = () => {
  const meta = { total: 10 };
  const size = 5;
  const onPaginationChange = () => {};

  return (
    <div style={{ textAlign: "center", margin: "10px 0" }}>
      <Pagination
        total={meta?.total}
        defaultPageSize={size}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default ServicePagePagination;
