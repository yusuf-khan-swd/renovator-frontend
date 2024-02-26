import ServiceDetailsPage from "@/components/Service/ServiceDetailsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const ServiceDetails = () => {
  return (
    <div>
      <ServiceDetailsPage />
    </div>
  );
};

export default ServiceDetails;
