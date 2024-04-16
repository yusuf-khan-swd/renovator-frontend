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

const EditReview = ({ id }: { id: string }) => {
  const { data, isLoading } = useReviewQuery(id);
  const service = data?.service;

  const [updateReview] = useUpdateReviewMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      data.rating = parseInt(data.rating);

      const result: any = await updateReview(data);

      if (result?.data)
        message.success("Review and Rating updated successfully");
      else message.error("Review and rating update failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
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
          { label: routeName, link: routeName },
          { label: endRoute, link: `${routeName}/${endRoute}/${id}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ padding: "24px 5px", display: "grid", gap: "24px" }}>
          <div>
            <ServiceDetailsCard service={service} />
          </div>

          <Card>
            <ReviewAndRatingHeading heading="Update Review" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(reviewAndRatingSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="rating"
                    label="Rating"
                    options={ratingOptions as SelectOptions[]}
                    required
                  />
                </Col>
              </Row>

              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={18} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="review"
                    label="Review Description"
                    rows={9}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
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

export default EditReview;
