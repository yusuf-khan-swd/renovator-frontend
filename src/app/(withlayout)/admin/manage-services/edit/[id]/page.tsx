"use client";

import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { serviceStatusOptions } from "@/constants/global";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useServiceQuery(id);

  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      const result: any = await updateService(data);

      if (result?.data) {
        message.success("Service updated successfully!");
      } else {
        message.error("Service updated failed!");
      }
    } catch (err: any) {
      console.error(err);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
    status: data?.status || "",
    categoryId: data?.categoryId || "",
    location: data?.location || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-services";
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
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "24px 5px" }}>
          <Card>
            <h1>Update Service Information</h1>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(serviceSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="title" label="Title" required />
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="price" label="Price $" required />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <CategoryField name="categoryId" label="Category" required />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="location" label="Location" required />
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="status"
                    label="Status"
                    options={serviceStatusOptions as SelectOptions[]}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={16} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="description"
                    label="Description"
                    rows={5}
                    required
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: "2px" }}
                  >
                    Update
                  </Button>
                  <Link href={`/${role}/manage-services/details/${id}`}>
                    <Button style={{ margin: "2px" }} type="default">
                      View Service Info
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EditServicePage;
