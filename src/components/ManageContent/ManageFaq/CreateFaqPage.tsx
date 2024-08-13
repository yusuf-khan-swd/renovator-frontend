"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import FormHeading from "@/components/ui/FormHeading";
import { useCreateFaqMutation } from "@/redux/api/content/faqApi";
import { contentSchema } from "@/schemas/content";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const CreateFaqPage = () => {
  const [createFaq] = useCreateFaqMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");

      const result: any = await createFaq(data);

      if (result?.data) message.success("Faq added successfully");
      else message.error("Faq added failed");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const routeLabel = "manage-faq";
  const routeUrl = "manage-contents/faq";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeLabel, link: routeUrl },
          { label: endRoute, link: `${routeUrl}/${endRoute}` },
        ]}
      />
      <div style={{ margin: "24px 5px" }}>
        <Card>
          <FormHeading title="Add new faq" />
          <Form submitHandler={onSubmit} resolver={yupResolver(contentSchema)}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={10} style={{ margin: "10px 0" }}>
                <FormInput name="title" label="Title" required />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={18} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="description"
                  label="Description"
                  rows={9}
                  required
                />
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              add
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CreateFaqPage;
