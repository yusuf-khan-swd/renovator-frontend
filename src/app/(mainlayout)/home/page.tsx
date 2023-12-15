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
    useUpcomingServiceQuery({ limit: 3 });

  // console.log(upcomingServices);

  const { data: ongoingServices, isLoading: isOngoingServicesLoading } =
    useOngoingServiceQuery({ limit: 3 });

  // console.log(ongoingServices);

  return (
    <div>
      <Banner />
      <h2 style={{ padding: "15px 0" }}>Ongoing Services</h2>
      {isOngoingServicesLoading ? (
        <FullScreenLoading />
      ) : (
        <Service services={ongoingServices} />
      )}
      <h2 style={{ padding: "15px 0" }}>Upcoming Services</h2>
      {isUpcomingServicesLoading ? (
        <FullScreenLoading />
      ) : (
        <Service services={upcomingServices} />
      )}
      <Feedback />
    </div>
  );
};

export default HomePage;
