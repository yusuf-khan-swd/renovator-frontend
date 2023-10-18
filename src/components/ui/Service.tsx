import { IService } from "@/types";
import { Row } from "antd";
import ServiceCard from "./ServiceCard";

interface IServiceProps {
  services: IService[] | undefined;
}

const Service = ({ services }: IServiceProps) => {
  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      {services?.map((service: IService) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </Row>
  );
};

export default Service;
