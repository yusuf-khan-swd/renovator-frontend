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

const ViewReviewPage = ({ params }: any) => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-reviews";
  const endRoute = "view";

  const id = params?.id;
  const { data, isLoading } = useReviewQuery(id);
  const service = data?.service;

  const router = useRouter();

  const [deleteReview] = useDeleteReviewMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const result: any = await deleteReview(id);

      router.push(`/${role}/${routeName}`);

      if (result?.data) {
        message.success("Review Delete successfully");
      } else {
        message.error("Review Delete failed!!");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id || "",
    serviceId: data?.serviceId,
    rating: data?.rating || "",
    review: data?.review || "",
  };

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
            <ReviewAndRatingHeading heading="Your Review" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(reviewAndRatingSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="rating" label="Rating" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={16} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="review"
                    label="Review Description"
                    rows={5}
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
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

export default ViewReviewPage;
