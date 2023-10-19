import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import ConfirmBookingModal from "./ConfirmBookingModal";

interface IServiceProps {
  service: IService;
}

const ServiceCard = ({ service }: IServiceProps) => {
  const { role } = getUserInfo() as any;

  const [createCart] = useCreateCartMutation();
  const [createBooking] = useCreateBookingMutation();

  const handleAddToCart = async (data: any) => {
    try {
      message.loading("Adding to cart");
      const result: any = await createCart(data);
      if (result?.data) {
        message.success("Service added to cart!");
      } else {
        message.error("Service adding to cart failed!");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleBooking = async (data: any) => {
    try {
      message.loading("Service Booking...");
      const result: any = await createBooking(data);
      if (result?.data) {
        message.success("Service booked successfully!!");
      } else {
        message.error("Service booking failed!");
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <Col span={24} style={{ margin: "10px 0" }}>
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
        <Row justify="space-between">
          <Link href={`/service/${service.id}`}>
            <Button>Details</Button>
          </Link>
          {role && (
            <div>
              <Button
                onClick={() => handleAddToCart({ serviceId: service.id })}
                style={{ marginRight: "5px" }}
              >
                Add to Cart
              </Button>
              <ConfirmBookingModal
                id={service.id}
                handleBooking={handleBooking}
              />
            </div>
          )}
        </Row>
      </Card>
    </Col>
  );
};

export default ServiceCard;
