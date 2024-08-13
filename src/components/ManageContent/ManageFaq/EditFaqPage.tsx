"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import FormHeading from "@/components/ui/FormHeading";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/content/faqApi";
import { contentSchema } from "@/schemas/content";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const EditFaqPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useFaqQuery(id);

  const [updateFaq] = useUpdateFaqMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      const result: any = await updateFaq(data);

      if (result?.data) message.success("Faq updated successfully");
      else message.error("Faq updated failed");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
  };

  const routeLabel = "manage-faq";
  const routeUrl = "manage-contents/faq";
  const endRoute = "edit";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeLabel, link: routeUrl },
          { label: endRoute, link: `${routeUrl}/${endRoute}/${id}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "24px 5px" }}>
          <Card>
            <FormHeading title="Update FAQ" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(contentSchema)}
              defaultValues={defaultValues}
            >
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
                Update
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EditFaqPage;
