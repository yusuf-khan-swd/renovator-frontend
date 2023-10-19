"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ServiceCard from "@/components/ui/ServiceCard";
import { useServiceQuery } from "@/redux/api/serviceApi";

const ServiceDetailsPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useServiceQuery(id);

  return (
    <div>
      <h1>Service Details Page of id: {id}</h1>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ServiceCard service={data} detailsButton={false} />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
