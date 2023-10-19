"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Feedback from "@/components/ui/Feedback";
import Service from "@/components/ui/Service";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { useState } from "react";

const HomePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useServicesQuery({ ...query });
  const services = data?.services;

  console.log(services);

  return (
    <div>
      <h1>Home Page</h1>
      {isLoading ? <CenterLoading /> : <Service services={services} />}
      <Feedback />
    </div>
  );
};

export default HomePage;
