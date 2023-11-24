"use client";

import ReviewAndRatingForm from "@/components/Forms/ReviewAndRatingForm";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Reviews from "@/components/ui/Reviews";
import ServiceCard from "@/components/ui/ServiceCard";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const ServiceDetailsPage = ({ params }: any) => {
  const { role } = getUserInfo() as any;

  const id = params?.id;
  const { data: service, isLoading: isServiceLoading } = useServiceQuery(id);

  return (
    <div>
      <h1 style={{ padding: "15px 0" }}>Service Details Page</h1>
      {isServiceLoading ? (
        <FullScreenLoading />
      ) : (
        <ServiceCard service={service} detailsPage={true} />
      )}

      <div>
        <div style={{ margin: "40px 0", minHeight: "80px" }}>
          {role ? (
            <ReviewAndRatingForm serviceId={id} />
          ) : (
            <div>
              Please{" "}
              <Link href="/login">
                <Button type="link" style={{ padding: "4px" }}>
                  Login
                </Button>
              </Link>{" "}
              to give review.
            </div>
          )}
        </div>
        <div style={{ minHeight: "120px" }}>
          <Reviews serviceId={id} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
