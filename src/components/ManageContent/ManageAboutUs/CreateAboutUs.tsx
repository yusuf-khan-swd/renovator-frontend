"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useCreateAboutUsMutation } from "@/redux/api/content/aboutUsApi";
import { contentSchema } from "@/schemas/content";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const CreateAboutUs = () => {
  const [createAboutUs] = useCreateAboutUsMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      const result: any = await createAboutUs(data);

      if (result?.data) {
        message.success("AboutUs added successfully");
      } else {
        message.error("AboutUs added failed");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const { role } = getUserInfo() as any;
  const routeLabel = "manage-about";
  const routeUrl = "manage-contents/about";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeLabel, link: `/${role}/${routeUrl}` },
          { label: endRoute, link: `/${role}/${routeUrl}/${endRoute}` },
        ]}
      />
      <div style={{ margin: "24px 5px" }}>
        <Card>
          <h1>Add new About Us</h1>
          <Form submitHandler={onSubmit} resolver={yupResolver(contentSchema)}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={10} style={{ margin: "10px 0" }}>
                <FormInput name="title" label="Title" required />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={18} style={{ margin: "10px 0" }}>
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

export default CreateAboutUs;
