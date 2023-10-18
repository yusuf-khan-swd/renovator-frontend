"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import { useState } from "react";

const HomePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useServicesQuery({ ...query });
  const services = data?.services;
  const meta = data?.meta;

  return isLoading ? (
    <FullScreenLoading />
  ) : (
    <div>
      <h1>Service page</h1>
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        {services?.map((service: any) => (
          <Col span={24} style={{ margin: "10px 0" }} key={service.id}>
            <Card hoverable title={service?.title}>
              <div style={{ paddingBottom: "15px" }}>
                <p>Category: {service.category.title}</p>
                <p>Price: ${service.price}</p>
                <p>
                  Status:{" "}
                  <span style={{ color: "green" }}>{service.status}</span>
                </p>
                <p>Location: {service.location}</p>
                <p>Description: {service?.description}</p>
              </div>
              <div>
                <Link href={`/service/${service.id}`}>Details</Link>
                <Button>Add to Cart</Button>
                <Button>Booked</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
