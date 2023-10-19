"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ActionBar from "@/components/ui/ActionBar";
import Service from "@/components/ui/Service";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

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

  return isLoading ? (
    <FullScreenLoading />
  ) : (
    <div>
      <ActionBar title="Service List">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
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
      <div>
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

      <Service services={services} />
    </div>
  );
};

export default ServicePage;
