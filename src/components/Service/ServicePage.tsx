"use client";

import { SelectOptions } from "@/components/Forms/FormSelectField";
import CenterLoading from "@/components/Loading/CenterLoading";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ActionBar from "@/components/ui/ActionBar";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";
import {
  ServiceSortBySelectOptions,
  handleSetSorting,
  serviceStatusOptions,
} from "./ServiceUtils";
import Services from "./Services";

// TODO: Implement search by price, location, status and category name

const ServicePage = () => {
  const [showMoreFilter, setShowMoreFilter] = useState(false);

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [categoryId, setCategoryId] = useState<string>();
  const [sorting, setSorting] = useState<string>();
  const [serviceStatus, setServiceStatus] = useState<string>();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  query["serviceStatus"] = serviceStatus;
  query["categoryId"] = categoryId;

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
    setCategoryId(undefined);
    setSorting(undefined);
    setServiceStatus(undefined);
  };

  const { data: categories, isLoading: categoryIsLoading } =
    useCategoriesQuery(undefined);
  const categoryOptions = categories?.map((category: any) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  categoryOptions?.unshift({ label: "All", value: "" });

  //TODO: service name ascending order is not working properly
  const handleSorting = (value: string) => {
    handleSetSorting(value, setSortBy, setSortOrder);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* Search input and Reload icon */}
        <ActionBar
          title="Our Services List"
          containerStyle={{ marginBottom: "10px" }}
          titleStyle={{ textAlign: "center" }}
        >
          {/* Search Input Field */}
          <Col xs={16} md={8}>
            <p style={{ marginBottom: "4px" }}>
              <label>Search Service</label>
            </p>
            <Input
              type="text"
              size="large"
              placeholder="ex: Repair, Restoration"
              value={searchTerm}
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Col>

          {/* Reload Icon */}
          <div style={{ marginTop: "17px" }}>
            {(!!sortBy ||
              !!sortOrder ||
              !!categoryId ||
              !!searchTerm ||
              !!minPrice ||
              !!maxPrice) && (
              <Button
                onClick={resetFilters}
                type="primary"
                style={{ margin: "0", maxWidth: "100%" }}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>

        {/* Maximum and Minimum price Input field   */}
        <Row>
          <Col xs={24} md={8} style={{ margin: "0 10px 10px 0" }}>
            <p style={{ marginBottom: "4px" }}>
              <label>Min Price</label>
            </p>
            <Input
              type="number"
              size="large"
              placeholder="ex: 200"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
            />
          </Col>
          <Col xs={24} md={8} style={{ marginBottom: "10px" }}>
            <p style={{ marginBottom: "4px" }}>
              <label>Max Price</label>
            </p>
            <Input
              type="number"
              size="large"
              placeholder="ex: 400"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            />
          </Col>
        </Row>

        {showMoreFilter && (
          <>
            {/* Service Sorting and Service Status Select fields   */}
            <Row>
              {/* Service Sorting Select Field*/}
              <Col xs={24} md={8} style={{ margin: "0px 10px 10px 0" }}>
                <p style={{ marginBottom: "4px" }}>
                  <label>Sort Order</label>
                </p>
                <Select
                  onChange={(value) => {
                    handleSorting(value);
                    setSorting(value);
                  }}
                  value={sorting}
                  size={"large"}
                  options={ServiceSortBySelectOptions()}
                  style={{ width: "100%" }}
                  placeholder={"Select Sorting Order"}
                />
              </Col>
              {/* Service Status Select fields */}
              <Col xs={24} md={8} style={{ marginBottom: "10px" }}>
                <p style={{ marginBottom: "4px" }}>
                  <label>Service Status</label>
                </p>
                <Select
                  onChange={(value) => {
                    setServiceStatus(value);
                  }}
                  value={serviceStatus}
                  size={"large"}
                  options={serviceStatusOptions()}
                  style={{ width: "100%" }}
                  placeholder={"Select Service Status"}
                />
              </Col>
            </Row>

            {/* Category Select field */}
            <Row>
              {categoryIsLoading ? (
                <CenterLoading />
              ) : (
                <Col span={24}>
                  <p style={{ marginBottom: "4px" }}>
                    <label>Filter by Category</label>
                  </p>
                  <Select
                    onChange={(value) => {
                      setCategoryId(value);
                    }}
                    value={categoryId}
                    size={"large"}
                    options={categoryOptions as SelectOptions[]}
                    style={{ width: "100%" }}
                    placeholder={"Select category"}
                  />
                </Col>
              )}
            </Row>
          </>
        )}

        <div style={{ marginTop: "10px" }}>
          <Button onClick={() => setShowMoreFilter(!showMoreFilter)}>
            {showMoreFilter ? "Close More Filters" : "More Filters"}
          </Button>
        </div>
      </div>

      {/* Normal Services */}
      <>
        {isLoading ? (
          <FullScreenLoading />
        ) : !services || services?.length <= 0 ? (
          <h3 style={{ margin: "2px", textAlign: "center" }}>
            No Services available
          </h3>
        ) : (
          <Services services={services} />
        )}
      </>
    </div>
  );
};

export default ServicePage;
