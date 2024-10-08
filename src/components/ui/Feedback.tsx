"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { ratingOptions } from "@/constants/global";
import { useCreateFeedbackMutation } from "@/redux/api/feedbackApi";
import { feedbackSchema } from "@/schemas/feedback";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import { useForm } from "react-hook-form";
import FormSelectField, { SelectOptions } from "../Forms/FormSelectField";

const Feedback = () => {
  const [createFeedback] = useCreateFeedbackMutation();
  const { reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");

      data.rating = parseInt(data.rating);

      const result: any = await createFeedback(data);

      if (result?.data) message.success("Thank you for your feedback");
      else message.error("Feedback failed to add!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const handleClearForm = () => {
    reset();
  };

  const defaultValues = {
    name: "",
    email: "",
    rating: "",
    review: "",
  };

  return (
    <div
      style={{
        margin: "40px 0",
      }}
    >
      <Card>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            margin: "8px 0",
            textAlign: "center",
          }}
        >
          Please leave a comment
        </h2>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(feedbackSchema)}
          defaultValues={defaultValues}
        >
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col xs={24} md={24} lg={24} style={{ margin: "10px 0" }}>
              <FormInput name="name" label="Your Name" required />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col xs={24} md={24} lg={24} style={{ margin: "10px 0" }}>
              <FormInput name="email" type="email" label="Email" required />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col xs={24} md={24} lg={24} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="rating"
                label="Rating"
                options={ratingOptions as SelectOptions[]}
                required
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col xs={24} md={24} lg={246} style={{ margin: "10px 0" }}>
              <FormTextArea name="review" label="Comment" rows={5} required />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" style={{ margin: "4px" }}>
            Submit Feedback
          </Button>
          <Button
            type="default"
            onClick={handleClearForm}
            style={{ margin: "4px" }}
          >
            Clear Form
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Feedback;
