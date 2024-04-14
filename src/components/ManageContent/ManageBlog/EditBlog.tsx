"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import FormHeading from "@/components/ui/FormHeading";
import {
  useBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/content/blogApi";
import { contentSchema } from "@/schemas/content";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const EditBlog = ({ id }: { id: string }) => {
  const { data, isLoading } = useBlogQuery(id);

  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      const result: any = await updateBlog(data);

      if (result?.data) message.success("Blog updated successfully");
      else message.error("Blog updated failed");
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

  const { role } = getUserInfo() as any;
  const routeLabel = "manage-blog";
  const routeUrl = "manage-contents/blog";
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
            <FormHeading title="Update Blog" />
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

export default EditBlog;
