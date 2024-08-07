"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Services from "@/components/Service/Services";
import { useUpcomingServiceQuery } from "@/redux/api/serviceApi";

const UpcomingService = () => {
  const { data: upcomingServices, isLoading: isUpcomingServicesLoading } =
    useUpcomingServiceQuery({ limit: 2 });

  return (
    <div>
      <h2 style={{ margin: "15px 0", textAlign: "center" }}>
        Upcoming Services
      </h2>
      {isUpcomingServicesLoading ? (
        <FullScreenLoading />
      ) : upcomingServices && upcomingServices?.length > 0 ? (
        <Services services={upcomingServices} />
      ) : (
        <h3 style={{ margin: "2px", textAlign: "center" }}>
          No upcoming service available
        </h3>
      )}
    </div>
  );
};

export default UpcomingService;
