"use client";

import HomePageCategories from "@/components/Category/HomePageCategories";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import OngoingService from "@/components/Service/OngoingService";
import Banner from "@/components/ui/Banner";
import Feedback from "@/components/ui/Feedback";
import Service from "@/components/ui/Service";
import { useUpcomingServiceQuery } from "@/redux/api/serviceApi";

const HomePage = () => {
  const { data: upcomingServices, isLoading: isUpcomingServicesLoading } =
    useUpcomingServiceQuery({ limit: 2 });

  return (
    <div>
      <Banner />
      <HomePageCategories />

      <div>
        <OngoingService />

        <div>
          <h2 style={{ margin: "15px 0" }}>Upcoming Services</h2>
          {isUpcomingServicesLoading ? (
            <FullScreenLoading />
          ) : upcomingServices?.length > 0 ? (
            <Service services={upcomingServices} />
          ) : (
            <h3>No upcoming service available</h3>
          )}
        </div>
      </div>
      <Feedback />
    </div>
  );
};

export default HomePage;
