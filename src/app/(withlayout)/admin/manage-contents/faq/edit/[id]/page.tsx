"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/content/faqApi";
import { contentSchema } from "@/schemas/content";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useFaqQuery(id);

  const [updateFaq] = useUpdateFaqMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      console.log(data);
      await updateFaq(data);
      message.success("Faq updated successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-contents/faq";
  const endRoute = "edit";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      <h1>Update faq</h1>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(contentSchema)}
        defaultValues={defaultValues}
      >
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
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditServicePage;
