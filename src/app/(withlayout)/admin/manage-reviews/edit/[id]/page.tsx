"use client";

import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ReviewAndRatingHeading from "@/components/ReviewAndRating/ReviewAndRatingHeading";
import ServiceDetailsCard from "@/components/Service/ServiceDetailsCard";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { ratingOptions } from "@/constants/global";
import { useReviewQuery, useUpdateReviewMutation } from "@/redux/api/reviewApi";
import { reviewAndRatingSchema } from "@/schemas/reviewAndRating";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

const EditReviewPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useReviewQuery(id);
  const service = data?.service;

  const [updateReview] = useUpdateReviewMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      data.rating = parseInt(data.rating);

      const result: any = await updateReview(data);
      if (result?.data) {
        message.success("Review and Rating updated successfully");
      } else {
        message.error("Review and rating update failed!");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id || "",
    serviceId: data?.serviceId,
    rating: data?.rating || "",
    review: data?.review || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-reviews";
  const endRoute = "edit";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ padding: "24px 5px" }}>
          <div style={{ marginBottom: "10px" }}>
            <ServiceDetailsCard service={service} />
          </div>

          <Card>
            <ReviewAndRatingHeading heading="Update Your Review" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(reviewAndRatingSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="rating"
                    label="Rating"
                    options={ratingOptions as SelectOptions[]}
                    required
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
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <Button type="primary" htmlType="submit">
                    Update Review
                  </Button>
                  <Link href={`/${role}/manage-reviews/view/${data?.id}`}>
                    <Button type="default" style={{ margin: "0 5px" }}>
                      View Review
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EditReviewPage;
