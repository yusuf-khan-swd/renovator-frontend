"use client";

import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Reviews from "@/components/ui/Reviews";
import ServiceCard from "@/components/ui/ServiceCard";
import { ratingOptions } from "@/constants/global";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { reviewAndRatingSchema } from "@/schemas/reviewAndRating";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
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
      <h1 style={{ padding: "15px 0" }}>Service Details Page</h1>
      {isServiceLoading ? (
        <FullScreenLoading />
      ) : (
        <ServiceCard service={service} detailsPage={true} />
      )}

      <div style={{ margin: "25px 0" }}>
        <h2 style={{ textAlign: "center" }}>Review Ratings</h2>
        {role && (
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(reviewAndRatingSchema)}
          >
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="rating"
                  label="Rating"
                  options={ratingOptions as SelectOptions[]}
                />
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
        )}
        <div>
          <Reviews serviceId={id} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
