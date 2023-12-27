"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Banner from "@/components/ui/Banner";
import Feedback from "@/components/ui/Feedback";
import Service from "@/components/ui/Service";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useOngoingServiceQuery,
  useUpcomingServiceQuery,
} from "@/redux/api/serviceApi";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";

const HomePage = () => {
  const { data: ongoingServices, isLoading: isOngoingServicesLoading } =
    useOngoingServiceQuery({ limit: 2 });

  const { data: upcomingServices, isLoading: isUpcomingServicesLoading } =
    useUpcomingServiceQuery({ limit: 2 });

  const { data: categories, isLoading: categoryIsLoading } =
    useCategoriesQuery(undefined);

  return (
    <div>
      <Banner />

      <div style={{ margin: "20px 0" }}>
        {categoryIsLoading ? (
          <CenterLoading />
        ) : (
          <Row gutter={{ lg: 24 }} justify={"center"} align={"middle"}>
            {categories?.map((category: any) => (
              <Col xs={24} lg={8} key={category?.id}>
                <Link href={`/category/${category?.id}`}>
                  <Button style={{ margin: "4px", width: "100%" }}>
                    {category?.title}
                  </Button>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <div style={{ display: "grid", gap: "40px" }}>
        <Card>
          <h2 style={{ margin: "15px 0" }}>Ongoing Services</h2>
          {isOngoingServicesLoading ? (
            <FullScreenLoading />
          ) : ongoingServices?.length > 0 ? (
            <Service services={ongoingServices} />
          ) : (
            <h3>No ongoing service available</h3>
          )}
        </Card>
        <Card>
          <h2 style={{ margin: "15px 0" }}>Upcoming Services</h2>
          {isUpcomingServicesLoading ? (
            <FullScreenLoading />
          ) : upcomingServices?.length > 0 ? (
            <Service services={upcomingServices} />
          ) : (
            <h3>No upcoming service available</h3>
          )}
        </Card>
      </div>
      <Feedback />
    </div>
  );
};

export default HomePage;
