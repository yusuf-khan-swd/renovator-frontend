"use client";

import { SelectOptions } from "@/components/Forms/FormSelectField";
import CenterLoading from "@/components/Loading/CenterLoading";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Service from "@/components/ui/Service";
import { useCategoriesQuery, useCategoryQuery } from "@/redux/api/categoryApi";
import { Card, Select } from "antd";
import Link from "next/link";
import { useState } from "react";

// TODO:

const CategoryServicesPage = ({ params }: any) => {
  const id = params?.id;
  const [categoryId, setCategoryId] = useState<string>(id);

  const { data, isLoading } = useCategoryQuery(id);

  const services = data?.services;

  const { data: categories, isLoading: categoryIsLoading } =
    useCategoriesQuery(undefined);
  const categoryOptions = categories?.map((category: any) => {
    return {
      label: <Link href={`/category/${category?.id}`}>{category?.title}</Link>,
      value: category?.id,
    };
  });

  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ margin: "10px 0 20px 0" }}>
        {categoryIsLoading ? (
          <CenterLoading />
        ) : (
          <Select
            onChange={setCategoryId}
            value={categoryId}
            size={"large"}
            options={categoryOptions as SelectOptions[]}
            style={{ width: "100%" }}
            placeholder={"Select category"}
          />
        )}
      </div>
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
