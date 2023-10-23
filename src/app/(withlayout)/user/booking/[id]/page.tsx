import CategoryField from "@/components/Forms/CategoryField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { serviceStatusOptions } from "@/constants/global";
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const BookingPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useServiceQuery(id);

  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      console.log(data);
      // const result:any =  await updateService(data);
      // if(result?.data) {
      // message.success("Service booking successfully");
      // } else {
      // message.error("Service booking failed");
      // }
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
    status: data?.status || "",
    categoryId: data?.categoryId || "",
    location: data?.location || "",
  };

  return (
    <div>
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
            <FormDatePicker name="date" label="Select Booking Date" />
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
          Book Service
        </Button>
      </Form>
    </div>
  );
};

export default BookingPage;
