"use client";

import { SelectOptions } from "@/components/Forms/FormSelectField";
import CenterLoading from "@/components/Loading/CenterLoading";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ActionBar from "@/components/ui/ActionBar";
import Service from "@/components/ui/Service";
import { useCategoriesQuery, useCategoryQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useState } from "react";

// TODO: Show service by category select field
// TODO: Use raw form on onChange to get category id
// TODO: Add sorting by price, name, location, status
// TODO: Implement search by price, location, status and category name

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [categoryId, setCategoryId] = useState<any>();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    query: searchTerm,
    delay: 600,
  });

  const debouncedMinPrice = useDebounced({
    query: minPrice,
    delay: 600,
  });

  const debouncedMaxPrice = useDebounced({
    query: maxPrice,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  if (!!debouncedMinPrice) {
    query["minPrice"] = debouncedMinPrice;
  }

  if (!!debouncedMaxPrice) {
    query["maxPrice"] = debouncedMaxPrice;
  }

  const { data, isLoading } = useServicesQuery({ ...query });
  const services = data?.services;
  const meta = data?.meta;

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
  };

  const { data: categories, isLoading: categoryIsLoading } =
    useCategoriesQuery(undefined);
  const categoryOptions = categories?.map((category: any) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  categoryOptions?.unshift({ label: "All", value: "all" });

  const { data: categoryServices, isLoading: categoryServiceIsLoading } =
    useCategoryQuery(categoryId);

  const filterServices = categoryServices?.services;

  return (
    <div>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          <ActionBar title="Service List">
            <Input
              type="text"
              size="large"
              placeholder="Service name..."
              style={{
                width: "20%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div>
              {(!!sortBy ||
                !!sortOrder ||
                !!searchTerm ||
                !!minPrice ||
                !!maxPrice) && (
                <Button
                  onClick={resetFilters}
                  type="primary"
                  style={{ margin: "0px 5px" }}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>
          <div style={{ marginBottom: "15px" }}>
            <Input
              type="text"
              size="large"
              placeholder="Minimum Price"
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
              style={{
                width: "20%",
                marginRight: "5px",
              }}
            />
            <Input
              type="text"
              size="large"
              placeholder="Maximum price"
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              style={{
                width: "20%",
              }}
            />
          </div>
          <div style={{ margin: "10px 0", minHeight: "40px" }}>
            {categoryIsLoading ? (
              <CenterLoading />
            ) : (
              <Select
                onChange={setCategoryId}
                size={"large"}
                options={categoryOptions as SelectOptions[]}
                style={{ width: "100%" }}
                placeholder={"Select"}
              />
            )}
          </div>
          {!categoryServices && <Service services={services} />}
          {filterServices?.length > 0 ? (
            <Service services={filterServices} />
          ) : (
            <h3 style={{ margin: "2px", textAlign: "center" }}>
              No Services available on this category
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
