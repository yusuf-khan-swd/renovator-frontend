"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

const DetailsServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useServiceQuery(id);
  console.log(data);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
    status: data?.status.toUpperCase() || "",
    categoryTitle: data?.category?.title,
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
            <h1>Service Details Information</h1>
            <Form
              submitHandler={onSubmit}
              resolver={yupResolver(serviceSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="title" label="Title" required readOnly />
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="price" label="Price" required readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="categoryTitle"
                    label="Category"
                    required
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput
                    name="location"
                    label="Location"
                    required
                    readOnly
                  />
                </Col>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormInput name="status" label="Status" required readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={16} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="description"
                    label="Description"
                    rows={5}
                    required
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <Link href={`/${role}/manage-services/edit/${id}`}>
                    <Button style={{ margin: "2px" }} type="primary">
                      Edit Service Info
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

export default DetailsServicePage;
