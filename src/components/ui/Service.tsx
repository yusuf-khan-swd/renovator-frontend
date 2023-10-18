import { IService } from "@/types";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";

interface IServiceProps {
  services: IService[] | undefined;
}

const Service = ({ services }: IServiceProps) => {
  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      {services?.map((service: any) => (
        <Col span={24} style={{ margin: "10px 0" }} key={service.id}>
          <Card hoverable title={service?.title}>
            <div style={{ paddingBottom: "15px" }}>
              <p>Category: {service.category.title}</p>
              <p>Price: ${service.price}</p>
              <p>
                Status: <span style={{ color: "green" }}>{service.status}</span>
              </p>
              <p>Location: {service.location}</p>
              <p>Description: {service?.description}</p>
            </div>
            <div>
              <Link href={`/service/${service.id}`}>Details</Link>
              <Button>Add to Cart</Button>
              <Button>Booked</Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Service;
