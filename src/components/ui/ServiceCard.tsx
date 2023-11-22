import { ENUM_USER_ROLE } from "@/constants/role";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

interface IServiceProps {
  service: IService;
  detailsPage?: boolean;
}

const ServiceCard = ({ service, detailsPage = false }: IServiceProps) => {
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
      <Card
        hoverable
        title={
          detailsPage ? (
            <p style={{ fontSize: "20px" }}>{service?.title}</p>
          ) : (
            <Link style={{ color: "inherit" }} href={`/service/${service?.id}`}>
              <p style={{ fontSize: "20px" }}>{service?.title}</p>
            </Link>
          )
        }
      >
        {detailsPage ? (
          <div
            style={{
              paddingBottom: "15px",
              display: "grid",
              gap: "2px",
            }}
          >
            <p>Category: {service?.category?.title}</p>
            <p>
              Price:{" "}
              <span style={{ fontWeight: "bold" }}>${service?.price}</span>
            </p>
            <p>
              Status:{" "}
              <span style={{ color: "green" }}>
                {service?.status.charAt(0).toUpperCase() +
                  service?.status.slice(1)}
              </span>
            </p>
            <p>Location: {service?.location}</p>
            <p style={{ padding: "5px 0" }}>
              <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
              <span>{service?.description}</span>
            </p>
          </div>
        ) : (
          <Link style={{ color: "inherit" }} href={`/service/${service?.id}`}>
            <div
              style={{
                paddingBottom: "15px",
                display: "grid",
                gap: "2px",
              }}
            >
              <p>Category: {service?.category?.title}</p>
              <p>
                Price:{" "}
                <span style={{ fontWeight: "bold" }}>${service?.price}</span>
              </p>
              <p>
                Status:{" "}
                <span style={{ color: "green" }}>
                  {service?.status.charAt(0).toUpperCase() +
                    service?.status.slice(1)}
                </span>
              </p>
              <p>Location: {service?.location}</p>
              <p style={{ padding: "5px 0" }}>
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                <span>
                  {service?.description.length <= 150
                    ? service?.description
                    : service?.description.slice(0, 150) + "..."}
                </span>
              </p>
            </div>
          </Link>
        )}

        <Row justify="space-between">
          <Link href={`/service/${service?.id}`}>
            <Button disabled={detailsPage}>Details</Button>
          </Link>

          <div>
            <Button
              onClick={() => handleAddToCart({ serviceId: service?.id })}
              style={{ marginRight: "5px" }}
              disabled={!(role === ENUM_USER_ROLE.USER)}
            >
              Add to Cart
            </Button>
            <Link href={`/user/booking/${service?.id}`}>
              <Button disabled={!(role === ENUM_USER_ROLE.USER)} type="primary">
                Booking
              </Button>
            </Link>
          </div>
        </Row>
      </Card>
    </Col>
  );
};

export default ServiceCard;
