import { IService } from "@/types";
import { Card } from "antd";
import ServiceCardBody from "./ServiceCardBody";
import ServiceCardTitle from "./ServiceCardTitle";

interface IServiceDetailsCard {
  service: IService;
}

const ServiceDetailsCard = ({ service }: IServiceDetailsCard) => {
  return (
    <Card title={<ServiceCardTitle title={service?.title} />}>
      <ServiceCardBody service={service} detailsPage />
    </Card>
  );
};

export default ServiceDetailsCard;
