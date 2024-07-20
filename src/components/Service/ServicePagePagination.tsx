import { Pagination } from "antd";
import { SetStateAction } from "react";

interface IServicePagePaginationProps {
  total: number;
  size: number;
  page: number;
  setPage: (value: SetStateAction<number>) => void;
  setSize: (value: SetStateAction<number>) => void;
}

const ServicePagePagination = ({
  total = 20,
  size = 5,
  page = 1,
  setPage,
  setSize,
}: IServicePagePaginationProps) => {
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  return (
    <div style={{ textAlign: "center", margin: "10px 0" }}>
      ServicePagePagination
      <Pagination
        total={total || 20}
        defaultPageSize={size}
        onChange={onPaginationChange}
        current={page}
        pageSize={size}
      />
    </div>
  );
};

export default ServicePagePagination;
