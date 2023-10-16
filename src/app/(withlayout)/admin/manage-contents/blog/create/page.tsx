"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useCreateBlogMutation } from "@/redux/api/content/blogApi";
import { contentSchema } from "@/schemas/content";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateServicePage = () => {
  const [createBlog] = useCreateBlogMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      // console.log(data);
      await createBlog(data);
      message.success("Blog added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-contents/blog";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      <h1>Add new faq</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(contentSchema)}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" required />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea
              name="description"
              label="Description"
              rows={5}
              required
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateServicePage;
