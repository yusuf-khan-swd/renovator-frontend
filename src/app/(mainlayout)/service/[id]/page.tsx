"use client";

import ReviewAndRatingForm from "@/components/Forms/ReviewAndRatingForm";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Reviews from "@/components/ui/Reviews";
import ServiceCard from "@/components/ui/ServiceCard";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";

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

      <div style={{ margin: "25px 0" }}>
        <h2 style={{ textAlign: "center" }}>Review Ratings</h2>
        {role && <ReviewAndRatingForm serviceId={id} />}
        <div>
          <Reviews serviceId={id} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
