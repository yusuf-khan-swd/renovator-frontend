import ServiceCard from "@/components/Service/ServiceCard";
import { IService } from "@/types";
import { Row } from "antd";

interface IServiceProps {
  services: IService[] | undefined;
}

const Services = ({ services }: IServiceProps) => {
  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      {services?.map((service: IService) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </Row>
  );
};

export default Services;
