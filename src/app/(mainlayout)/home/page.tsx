"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Banner from "@/components/ui/Banner";
import Feedback from "@/components/ui/Feedback";
import Service from "@/components/ui/Service";
import {
  useOngoingServiceQuery,
  useUpcomingServiceQuery,
} from "@/redux/api/serviceApi";

const HomePage = () => {
  const { data: upcomingServices, isLoading: isUpcomingServicesLoading } =
    useUpcomingServiceQuery({ limit: 2 });

  const { data: ongoingServices, isLoading: isOngoingServicesLoading } =
    useOngoingServiceQuery({ limit: 2 });

  return (
    <div>
      <Banner />
      <h2 style={{ margin: "15px 0" }}>Ongoing Services</h2>
      {isOngoingServicesLoading ? (
        <FullScreenLoading />
      ) : ongoingServices?.length > 0 ? (
        <Service services={ongoingServices} />
      ) : (
        <h3>No ongoing service available</h3>
      )}
      <h2 style={{ margin: "15px 0" }}>Upcoming Services</h2>
      {isUpcomingServicesLoading ? (
        <FullScreenLoading />
      ) : upcomingServices?.length > 0 ? (
        <Service services={upcomingServices} />
      ) : (
        <h3>No upcoming service available</h3>
      )}
      <Feedback />
    </div>
  );
};

export default HomePage;
