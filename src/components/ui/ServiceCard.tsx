import { ENUM_USER_ROLE } from "@/constants/role";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { IService } from "@/types";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import ServiceCardBody from "../Service/ServiceCardBody";
import ServiceCardTitle from "../Service/ServiceCardTitle";

interface IServiceProps {
  service: IService;
  detailsPage?: boolean;
}

const ServiceCard = ({ service, detailsPage = false }: IServiceProps) => {
  const { role } = getUserInfo() as any;

  const [createCart] = useCreateCartMutation();

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

  return (
    <Col span={24} style={{ margin: "10px 0" }}>
      <Card
        hoverable
        title={
          detailsPage ? (
            <ServiceCardTitle title={service?.title} />
          ) : (
            <Link style={{ color: "inherit" }} href={`/service/${service?.id}`}>
              <ServiceCardTitle title={service?.title} />
            </Link>
          )
        }
      >
        <ServiceCardBody service={service} />

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
