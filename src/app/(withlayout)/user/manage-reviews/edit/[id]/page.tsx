"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categoryApi";
import { categorySchema } from "@/schemas/category";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const EditCategoryPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useCategoryQuery(id);

  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      console.log(data);
      await updateCategory(data);
      message.success("Category updated successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
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
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      <h1>Update category</h1>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(categorySchema)}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" required />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditCategoryPage;
