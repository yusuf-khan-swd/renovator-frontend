"use client";

import { useCategoryQuery } from "@/redux/api/categoryApi";

const CategoryServicesPage = ({ params }: any) => {
  const id = params?.id;

  const { data, isLoading } = useCategoryQuery(id);

  console.log(data);

  const services = data?.services;

  console.log(services);

  return <div>Category: {data?.title}</div>;
};

export default CategoryServicesPage;
