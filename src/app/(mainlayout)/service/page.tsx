"use client";

import { useServicesQuery } from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { Card } from "antd";
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

  return (
    <div>
      <h1>Service page</h1>
      {services?.map((service: any) => (
        <div key={service?.id}>
          <Card hoverable title={service?.title} style={{ width: 240 }}>
            <p>{service?.description}</p>
          </Card>
        </div>
      ))}
      <Link href={`/service/${1}`}>Details</Link>
    </div>
  );
};

export default HomePage;
