"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import {
  useBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/content/blogApi";
import { contentSchema } from "@/schemas/content";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const EditBlogPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useBlogQuery(id);

  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      const result: any = await updateBlog(data);

      if (result?.data) {
        message.success("Blog updated successfully");
      } else {
        message.error("Blog updated failed");
      }
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
          { label: routeLabel, link: `/${role}/${routeUrl}` },
          { label: endRoute, link: `/${role}/${routeUrl}/${endRoute}` },
        ]}
      />
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "24px 5px" }}>
          <Card>
            <h1>Update Blog</h1>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(contentSchema)}
              defaultValues={defaultValues}
            >
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
                Update
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EditBlogPage;
