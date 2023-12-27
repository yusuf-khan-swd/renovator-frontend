"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Service from "@/components/ui/Service";
import { useCategoryQuery } from "@/redux/api/categoryApi";
import { Card } from "antd";

const CategoryServicesPage = ({ params }: any) => {
  const id = params?.id;

  const { data, isLoading } = useCategoryQuery(id);

  const services = data?.services;

  return (
    <div style={{ margin: "10px 0" }}>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card>
          <h3 style={{ margin: "10px 0" }}>Category: {data?.title}</h3>
          {services?.length > 0 ? (
            <Service services={services} />
          ) : (
            <h3 style={{ margin: "2px", textAlign: "center" }}>
              No Services available on this category
            </h3>
          )}
        </Card>
      )}
    </div>
  );
};

export default CategoryServicesPage;
