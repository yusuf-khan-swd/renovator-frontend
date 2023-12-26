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
    <div>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card>
          <h3>Category: {data?.title}</h3>
          <Service services={services} />
        </Card>
      )}
    </div>
  );
};

export default CategoryServicesPage;
