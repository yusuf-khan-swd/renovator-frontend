"use client";

import { SelectOptions } from "@/components/Forms/FormSelectField";
import CenterLoading from "@/components/Loading/CenterLoading";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Services from "@/components/Service/Services";
import ActionBar from "@/components/ui/ActionBar";
import { useCategoriesQuery, useCategoryQuery } from "@/redux/api/categoryApi";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select } from "antd";
import { useState } from "react";

// TODO: Add sorting by price, name, location, status, use new state or use previous state
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

  const [categoryId, setCategoryId] = useState<string>();
  const [sorting, setSorting] = useState<string>();
  const [serviceStatus, setServiceStatus] = useState<string>();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["serviceStatus"] = serviceStatus;

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

  categoryOptions?.unshift({ label: "All", value: "all" });

  const { data: categoryServices, isLoading: categoryServiceIsLoading } =
    useCategoryQuery(categoryId);

  const filterServices = categoryServices?.services;

  const MIN_MAX_PRICE = "min_max";
  const MAX_MIN_PRICE = "max_min";
  const SERVICE_NAME_ASC = "service_name_asc";
  const SERVICE_NAME_DESC = "service_name_desc";
  const SERVICE_LOCATION_ASC = "service_location_asc";
  const SERVICE_LOCATION_DESC = "service_location_desc";
  const SERVICE_STATUS_ASC = "service_status_asc";
  const SERVICE_STATUS_DESC = "service_status_desc";

  const sortByOptions = [
    { label: "Any", value: "" },
    { label: "Price - Asc", value: MIN_MAX_PRICE },
    { label: "Price - Desc", value: MAX_MIN_PRICE },
    { label: "Service Name  - Asc", value: SERVICE_NAME_ASC },
    { label: "Service Name  - Desc", value: SERVICE_NAME_DESC },
    { label: "Location  - Asc", value: SERVICE_LOCATION_ASC },
    { label: "Location  - Desc", value: SERVICE_LOCATION_DESC },
    { label: "Status  - Asc", value: SERVICE_STATUS_ASC },
    { label: "Status  - Desc", value: SERVICE_STATUS_DESC },
  ];

  const ASC = "asc";
  const DESC = "desc";

  const PRICE = "price";
  const TITLE = "title";
  const LOCATION = "location";
  const STATUS = "status";

  //TODO: service name ascending order is not working properly
  const handleSorting = (value: string) => {
    if (!value) {
      setSortBy("");
      setSortOrder("");
    } else if (value === MIN_MAX_PRICE) {
      setSortBy(PRICE);
      setSortOrder(ASC);
    } else if (value === MAX_MIN_PRICE) {
      setSortBy(PRICE);
      setSortOrder(DESC);
    } else if (value === SERVICE_NAME_ASC) {
      setSortBy(TITLE);
      setSortOrder(ASC);
    } else if (value === SERVICE_NAME_DESC) {
      setSortBy(TITLE);
      setSortOrder(DESC);
    } else if (value === SERVICE_LOCATION_ASC) {
      setSortBy(LOCATION);
      setSortOrder(ASC);
    } else if (value === SERVICE_LOCATION_DESC) {
      setSortBy(LOCATION);
      setSortOrder(DESC);
    } else if (value === SERVICE_STATUS_ASC) {
      setSortBy(STATUS);
      setSortOrder(ASC);
    } else if (value === SERVICE_STATUS_DESC) {
      setSortBy(STATUS);
      setSortOrder(DESC);
    } else {
      setSortBy("");
      setSortOrder("");
    }
  };

  const UPCOMING = "upcoming";
  const AVAILABLE = "available";

  const serviceStatusOptions = [
    { label: "Any", value: "" },
    { label: "Upcoming", value: UPCOMING },
    { label: "Available", value: AVAILABLE },
  ];

  return (
    <div>
      <div>
        {/* Search input and Reload icon */}
        <ActionBar
          title="Service List"
          containerStyle={{ marginBottom: "10px" }}
        >
          <Col xs={16} md={8}>
            <label>Search Service</label>
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
                setCategoryId("all");
                setMinPrice("");
                setMaxPrice("");
              }}
            />
          </Col>
          <div>
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
            <label>Min Price</label>
            <Input
              type="number"
              size="large"
              placeholder="ex: 200"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setSearchTerm("");
                setCategoryId("all");
              }}
            />
          </Col>
          <Col xs={24} md={8} style={{ marginBottom: "10px" }}>
            <label>Max Price</label>
            <Input
              type="number"
              size="large"
              placeholder="ex: 400"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setSearchTerm("");
                setCategoryId("all");
              }}
            />
          </Col>
        </Row>

        {/* Service Sorting and Service Status Select fields   */}
        <Row>
          <Col xs={24} md={8} style={{ margin: "0px 10px 10px 0" }}>
            <label>Sort Order</label>
            <Select
              onChange={(value) => {
                handleSorting(value);
                setSorting(value);
                setCategoryId("all");
                setSearchTerm("");
                setMinPrice("");
                setMaxPrice("");
              }}
              value={sorting}
              size={"large"}
              options={sortByOptions as SelectOptions[]}
              style={{ width: "100%" }}
              placeholder={"Select Sorting Order"}
            />
          </Col>
          <Col xs={24} md={8}>
            <label>Service Status</label>
            <Select
              onChange={(value) => {
                setServiceStatus(value);
                setCategoryId("all");
                setSearchTerm("");
                setMinPrice("");
                setMaxPrice("");
              }}
              value={serviceStatus}
              size={"large"}
              options={serviceStatusOptions as SelectOptions[]}
              style={{ width: "100%" }}
              placeholder={"Select Service Status"}
            />
          </Col>
        </Row>

        {/* Category Select field */}
        <Row style={{ margin: "10px 0" }}>
          {categoryIsLoading ? (
            <CenterLoading />
          ) : (
            <Col xs={24}>
              <label>Filter by Category</label>
              <Select
                onChange={(value) => {
                  setCategoryId(value);
                  setSearchTerm("");
                  setMinPrice("");
                  setMaxPrice("");
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

        {/* Normal Services */}
        {!categoryServices && (
          <>
            {isLoading ? (
              <FullScreenLoading />
            ) : (
              <Services services={services} />
            )}
          </>
        )}

        {/* Filter service by category ID */}
        {filterServices?.length > 0 ? (
          <>
            {categoryServiceIsLoading ? (
              <FullScreenLoading />
            ) : (
              <Services services={filterServices} />
            )}
          </>
        ) : (
          filterServices?.length <= 0 && (
            <h3 style={{ margin: "2px", textAlign: "center" }}>
              No Services available on this category
            </h3>
          )
        )}
      </div>
    </div>
  );
};

export default ServicePage;
