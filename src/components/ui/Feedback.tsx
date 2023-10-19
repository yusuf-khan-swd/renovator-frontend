"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useCreateFeedbackMutation } from "@/redux/api/feedbackApi";
import { Button, Col, Row, message } from "antd";

const Feedback = () => {
  const [createFeedback] = useCreateFeedbackMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Adding.....");
      data.rating = parseInt(data.rating);
      const result: any = await createFeedback(data);
      // console.log(result);
      if (result?.data) {
        message.success("Thank you for your feedback");
      } else {
        message.error("Feedback failed to add!");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div
      style={{
        margin: "20px 0",
      }}
    >
      <h1>Please give your feedback</h1>

      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="name" label="Your Name" required />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="email" type="email" label="Email" required />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput type="number" name="rating" label="Rating" required />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={16} style={{ margin: "10px 0" }}>
            <FormTextArea name="review" label="Comment" rows={5} required />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Submit a Feedback
        </Button>
      </Form>
    </div>
  );
};

export default Feedback;
