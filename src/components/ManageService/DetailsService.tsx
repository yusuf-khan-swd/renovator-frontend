"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ConfirmModalServiceContent from "@/components/ui/ConfirmModalServiceContent";
import FormHeading from "@/components/ui/FormHeading";
import {
  useDeleteServiceMutation,
  useServiceQuery,
} from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardLink from "../DashboardLink";

const DetailsService = ({ id }: { id: string }) => {
  const { data, isLoading } = useServiceQuery(id);
  const [deleteService] = useDeleteServiceMutation();
  const router = useRouter();

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const result: any = await deleteService(id);

      if (result?.data) {
        router.push(`/${role}/${routeName}`);
        message.success("Service Delete successfully");
      } else {
        message.error("Service Delete failed!");
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
    price: "$" + data?.price || "",
    status: data?.status.toUpperCase() || "",
    categoryTitle: data?.category?.title,
    location: data?.location || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-services";
  const endRoute = "details";

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
            <FormHeading title="Service Details" />
            <Form
              resolver={yupResolver(serviceSchema)}
              defaultValues={defaultValues}
            >
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <FormInput name="title" label="Title" readOnly />
                </Col>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <FormInput name="price" label="Price" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <FormInput name="categoryTitle" label="Category" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <FormInput name="location" label="Location" readOnly />
                </Col>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <FormInput name="status" label="Status" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={16} style={{ margin: "10px 0" }}>
                  <FormTextArea
                    name="description"
                    label="Description"
                    rows={5}
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                  <DashboardLink pageRoute={`${routeName}/edit/${id}`}>
                    <Button style={{ margin: "2px" }} type="primary">
                      Edit Service Info
                    </Button>
                  </DashboardLink>
                  <Link href={`/${role}/${routeName}/edit/${id}`}>
                    <Button style={{ margin: "2px" }} type="primary">
                      Edit Service Info
                    </Button>
                  </Link>
                  <ConfirmModal
                    id={id}
                    handler={deleteHandler}
                    title="Do you want to delete this service?"
                    content={<ConfirmModalServiceContent service={data} />}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DetailsService;
