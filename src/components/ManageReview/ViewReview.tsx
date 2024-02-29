"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ReviewAndRatingHeading from "@/components/ReviewAndRating/ReviewAndRatingHeading";
import ServiceDetailsCard from "@/components/Service/ServiceDetailsCard";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteReviewMutation, useReviewQuery } from "@/redux/api/reviewApi";
import { reviewAndRatingSchema } from "@/schemas/reviewAndRating";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewReview = ({ id }: { id: string }) => {
  const { data, isLoading } = useReviewQuery(id);
  const service = data?.service;

  const router = useRouter();

  const [deleteReview] = useDeleteReviewMutation();

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const result: any = await deleteReview(id);

      if (result?.data) {
        router.push(`/${role}/${routeName}`);
        message.success("Review Delete successfully");
      } else {
        message.error("Review Delete failed!!");
      }
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
  const endRoute = "view";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}/${id}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ padding: "24px 5px", display: "grid", gap: "24px" }}>
          <div style={{ marginBottom: "10px" }}>
            <ServiceDetailsCard service={service} />
          </div>

          <Card>
            <ReviewAndRatingHeading heading="Review Details" />
            <Form
              resolver={yupResolver(reviewAndRatingSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="rating" label="Rating" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={18} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="review"
                    label="Review Description"
                    rows={9}
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <Link href={`/${role}/manage-reviews/edit/${id}`}>
                    <Button type="primary">Edit Review</Button>
                  </Link>
                  <ConfirmModal
                    id={id}
                    handler={deleteHandler}
                    title="Do you want to delete this review?"
                    content={`Delete this review!`}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewReview;
