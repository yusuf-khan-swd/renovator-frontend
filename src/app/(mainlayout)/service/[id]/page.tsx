import ServiceDetailsPage from "@/components/Service/ServiceDetailsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const ServiceDetails = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <ServiceDetailsPage id={id} />
    </div>
  );
};

export default ServiceDetails;
