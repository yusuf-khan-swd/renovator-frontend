import ServicePage from "@/components/Service/ServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service - Renovator",
  description: "A Home Renovation Service Provider",
};

const Service = () => {
  return (
    <div>
      <ServicePage />
    </div>
  );
};

export default Service;
