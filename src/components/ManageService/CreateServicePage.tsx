"use client";

import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import FormHeading from "@/components/ui/FormHeading";
import { serviceCreateStatusOptions } from "@/constants/global";
import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";

const CreateServicePage = () => {
  const [createService] = useCreateServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");

      const result: any = await createService(data);

      if (result?.data) message.success("Service created successfully!");
      else message.error("Service create failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    status: ENUM_SERVICE_STATUS.AVAILABLE,
  };

  const routeName = "manage-services";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: routeName },
          { label: endRoute, link: `${routeName}/${endRoute}` },
        ]}
      />
      <div style={{ margin: "24px 5px" }}>
        <Card>
          <FormHeading title="Add a New Service" />
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(serviceSchema)}
            defaultValues={defaultValues}
          >
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                <FormInput name="title" label="Title" required />
              </Col>
              <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                <FormInput name="price" label="Price $" required />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                <CategoryField name="categoryId" label="Category" required />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                <FormInput name="location" label="Location" required />
              </Col>
              <Col xs={24} xl={8} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="status"
                  label="Status"
                  options={serviceCreateStatusOptions as SelectOptions[]}
                  required
                />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} xl={16} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="description"
                  label="Description"
                  rows={5}
                  required
                />
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

export default CreateServicePage;
