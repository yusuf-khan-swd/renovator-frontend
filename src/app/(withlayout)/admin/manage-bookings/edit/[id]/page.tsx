"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { bookingStatusOptions } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { serviceSchema } from "@/schemas/service";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useBookingQuery(id);

  const [updateBooking] = useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      console.log(data);
      await updateBooking(data);
      message.success("Booking updated successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    date: data?.date || "",
    status: data?.status || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-bookings";
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
      <h1>Update Booking</h1>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(serviceSchema)}
        defaultValues={defaultValues}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="date" label="Date" required />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="status"
              label="Status"
              options={bookingStatusOptions as SelectOptions[]}
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditServicePage;
