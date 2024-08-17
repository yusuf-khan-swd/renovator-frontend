"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { categorySchema } from "@/schemas/category";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import FormHeading from "../ui/FormHeading";

const EditCategoryPage = ({ id }: { id: string }) => {
  const { data, isLoading } = useCategoryQuery(id);

  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      const result: any = await updateCategory(data);

      if (result?.data) message.success("Category updated successfully");
      else message.error("Category updated failed");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-categories";
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
            <FormHeading title="Update category" />
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(categorySchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={10} style={{ margin: "10px 0" }}>
                  <FormInput name="title" label="Title" required />
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

export default EditCategoryPage;
