import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { IService } from "@/types";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

interface IServiceProps {
  services: IService[] | undefined;
}

const Service = ({ services }: IServiceProps) => {
  const [createCart] = useCreateCartMutation();
  const [createBooking] = useCreateBookingMutation();

  const handleAddToCart = async (data: any) => {
    try {
      console.log(data);
      message.loading("Adding to cart");
      const result = await createCart(data);
      console.log(result);
      message.success("Service added to cart!");
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleBooking = async (data: any) => {
    try {
      console.log(data);
      message.loading("Adding to cart");
      const result = await createBooking(data);
      console.log(result);
      message.success("Service added to cart!");
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      {services?.map((service: IService) => (
        <Col span={24} style={{ margin: "10px 0" }} key={service.id}>
          <Card hoverable title={service?.title}>
            <div style={{ paddingBottom: "15px" }}>
              <p>Category: {service?.category?.title}</p>
              <p>Price: ${service.price}</p>
              <p>
                Status: <span style={{ color: "green" }}>{service.status}</span>
              </p>
              <p>Location: {service.location}</p>
              <p>Description: {service?.description}</p>
            </div>
            <div>
              <Link href={`/service/${service.id}`}>Details</Link>
              <Button
                onClick={() => handleAddToCart({ serviceId: service.id })}
              >
                Add to Cart
              </Button>
              <Button onClick={() => handleBooking({ serviceId: service.id })}>
                Booking
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Service;
