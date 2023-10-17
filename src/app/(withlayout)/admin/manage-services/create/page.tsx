"use client";

import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { serviceStatusOptions } from "@/constants/global";
import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateServicePage = () => {
  const [createService] = useCreateServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      // console.log(data);
      await createService(data);
      message.success("Service added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    status: ENUM_SERVICE_STATUS.AVAILABLE,
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-services";
  const endRoute = "create";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      <h1>Add new service</h1>
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
            <FormInput name="price" label="Price" required />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <CategoryField name="categoryId" label="Category" />
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
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
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
    </div>
  );
};

export default CreateServicePage;
