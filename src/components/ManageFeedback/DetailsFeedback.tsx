"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {
  useDeleteFeedbackMutation,
  useFeedbackQuery,
} from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schemas/feedback";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormHeading from "../ui/FormHeading";

const DetailsFeedback = ({ id }: { id: string }) => {
  const { data, isLoading } = useFeedbackQuery(id);

  const router = useRouter();

  const [deleteFeedback] = useDeleteFeedbackMutation();

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");

      const result: any = await deleteFeedback(id);

      router.push(`/${role}/${routeName}`);

      if (result?.data) message.success("Feedback Delete successfully");
      else message.error("Feedback Delete failed!!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    name: data?.name || "",
    email: data?.email || "",
    rating: data?.rating || "",
    review: data?.review || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-feedbacks";

  return (
    <div>
      <CommonBreadCrumb
        items={[{ label: routeName, link: `/${role}/${routeName}` }]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ padding: "24px 5px" }}>
          <Card>
            <FormHeading title="Update Feedback" />
            <Form
              resolver={yupResolver(feedbackSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="name" label="User Name" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="email" label="User Email" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="rating" label="Rating" />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={18} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="review"
                    label="Review"
                    rows={9}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <Link href={`/${role}/${routeName}/edit/${id}`}>
                    <Button type="primary">Edit Feedback</Button>
                  </Link>
                  <ConfirmModal
                    id={id}
                    handler={deleteHandler}
                    title="Do you want to delete this feedback?"
                    content={`Delete this feedback!`}
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

export default DetailsFeedback;
