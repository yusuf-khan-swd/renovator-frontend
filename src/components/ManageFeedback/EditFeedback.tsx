"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { ratingOptions } from "@/constants/global";
import {
  useFeedbackQuery,
  useUpdateFeedbackMutation,
} from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schemas/feedback";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import DashboardLink from "../DashboardLink";
import FormHeading from "../ui/FormHeading";

const EditFeedback = ({ id }: { id: string }) => {
  const { data, isLoading } = useFeedbackQuery(id);

  const [updateFeedback] = useUpdateFeedbackMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      data.rating = parseInt(data.rating);

      const result: any = await updateFeedback(data);

      if (result?.data) message.success("Feedback updated successfully");
      else message.error("Feedback update failed!");
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
        <div style={{ margin: "24px 5px" }}>
          <Card>
            <FormHeading title="Update Feedback" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(feedbackSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="name" label="User Name" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="email" label="User Email" readOnly />
                </Col>
              </Row>
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
                    label="Review"
                    rows={9}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                  <DashboardLink pageRoute={`${routeName}/view/${id}`}>
                    <Button style={{ margin: "2px" }} type="default">
                      View Feedback Info
                    </Button>
                  </DashboardLink>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EditFeedback;
