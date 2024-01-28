"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useFeedbackQuery } from "@/redux/api/feedbackApi";
import { useDeleteReviewMutation } from "@/redux/api/reviewApi";
import { feedbackSchema } from "@/schemas/feedback";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ViewFeedbackPage = ({ params }: any) => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-feedbacks";
  const endRoute = "view";

  const id = params?.id;
  const { data, isLoading } = useFeedbackQuery(id);

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
    id: data?.id,
    name: data?.name || "",
    email: data?.email || "",
    rating: data?.rating || "",
    review: data?.review || "",
  };

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ padding: "24px 5px" }}>
          <Card>
            <h1>Update Feedback</h1>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(feedbackSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={10} style={{ margin: "10px 0" }}>
                  <FormInput name="name" label="User Name" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={10} style={{ margin: "10px 0" }}>
                  <FormInput name="email" label="User Email" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={10} style={{ margin: "10px 0" }}>
                  <FormInput name="rating" label="Rating" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={18} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="review"
                    label="Review"
                    rows={9}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <Link href={`/${role}/${routeName}/edit/${id}`}>
                    <Button type="primary">Edit Feedback</Button>
                  </Link>
                  <ConfirmModal
                    id={id}
                    handler={deleteHandler}
                    title="Do you want to delete this feedback?"
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

export default ViewFeedbackPage;
