"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { categorySchema } from "@/schemas/category";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      const result: any = await createCategory(data);
      if (result?.data) message.success("Category added successfully");
      else message.error("Category added failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-categories";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      <div style={{ margin: "24px 5px" }}>
        <Card>
          <h1>Add new category</h1>
          <Form submitHandler={onSubmit} resolver={yupResolver(categorySchema)}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={10} style={{ margin: "10px 0" }}>
                <FormInput name="title" label="Title" required />
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

export default CreateCategory;
