"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Reviews from "@/components/ui/Reviews";
import ServiceCard from "@/components/ui/ServiceCard";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const ServiceDetailsPage = ({ params }: any) => {
  const { role } = getUserInfo() as any;

  const id = params?.id;
  const { data: service, isLoading: isServiceLoading } = useServiceQuery(id);

  const [createReview] = useCreateReviewMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      data.serviceId = id;
      data.rating = parseInt(data.rating);
      const result: any = await createReview(data);
      // console.log(result);
      if (result?.data) {
        message.success("Review and Rating added successfully");
      } else {
        message.error("Review and rating failed to add!");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <h1>Service Details Page of id: {id}</h1>
      {isServiceLoading ? (
        <FullScreenLoading />
      ) : (
        <ServiceCard service={service} detailsButton={false} />
      )}

      <div style={{ margin: "25px 0" }}>
        <h2 style={{ textAlign: "center" }}>Review Ratings</h2>
        <Form submitHandler={onSubmit}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput type="number" name="rating" label="Rating" required />
            </Col>
          </Row>

          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={16} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="review"
                label="Review Description"
                rows={5}
                required
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit a Review
          </Button>
        </Form>
        <div>
          <Reviews serviceId={id} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
