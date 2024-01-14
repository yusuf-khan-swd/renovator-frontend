"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Service from "@/components/ui/Service";
import { useOngoingServiceQuery } from "@/redux/api/serviceApi";

const OngoingService = () => {
  const { data: ongoingServices, isLoading: isOngoingServicesLoading } =
    useOngoingServiceQuery({ limit: 2 });

  return (
    <div style={{ margin: "40px 0" }}>
      <h2 style={{ margin: "15px 0" }}>Ongoing Services</h2>
      {isOngoingServicesLoading ? (
        <FullScreenLoading />
      ) : ongoingServices?.length > 0 ? (
        <Service services={ongoingServices} />
      ) : (
        <h3>No ongoing service available</h3>
      )}
    </div>
  );
};

export default OngoingService;
