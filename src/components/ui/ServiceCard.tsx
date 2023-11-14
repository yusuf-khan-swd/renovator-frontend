import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import ConfirmBookingModal from "./ConfirmBookingModal";

interface IServiceProps {
  service: IService;
  detailsPage?: Boolean;
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
        title={<p style={{ fontSize: "20px" }}>{service?.title}</p>}
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
              {detailsPage ? (
                <span>{service?.description}</span>
              ) : (
                <span>
                  {service?.description.length <= 150
                    ? service?.description
                    : service?.description.slice(0, 150) + "..."}
                </span>
              )}
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
                {detailsPage ? (
                  <span>{service?.description}</span>
                ) : (
                  <span>
                    {service?.description.length <= 150
                      ? service?.description
                      : service?.description.slice(0, 150) + "..."}
                  </span>
                )}
              </p>
            </div>
          </Link>
        )}

        <Row justify="space-between">
          {!detailsPage ? (
            <Link href={`/service/${service?.id}`}>
              <Button>Details</Button>
            </Link>
          ) : (
            <div></div>
          )}
          {role && (
            <div>
              <Button
                onClick={() => handleAddToCart({ serviceId: service?.id })}
                style={{ marginRight: "5px" }}
              >
                Add to Cart
              </Button>
              <Link href={`/user/booking/${service?.id}`}>
                <Button>Booking</Button>
              </Link>
              <ConfirmBookingModal
                id={service?.id}
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
