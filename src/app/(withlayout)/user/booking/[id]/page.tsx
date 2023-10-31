"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row, message } from "antd";

const BookingPage = ({ params }: any) => {
  const id = params?.id;
  const { userId } = getUserInfo() as any;
  const { data: service, isLoading } = useServiceQuery(id);

  const [createBooking] = useCreateBookingMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      data.serviceId = id;
      data.userId = userId;
      data.date = new Date();
      console.log(data);
      const result: any = await createBooking(data);
      console.log(result);
      if (result?.data) {
        message.success("Service booking successfully");
      } else {
        message.error("Service booking failed");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    date: service?.date,
  };

  return (
    <div>
      <Card title={service?.title}>
        <div style={{ paddingBottom: "15px", fontSize: "16px" }}>
          <p>Category: {service?.category?.title}</p>
          <p>Price: ${service?.price}</p>
          <p>
            Status: <span style={{ color: "green" }}>{service?.status}</span>
          </p>
          <p>Location: {service?.location}</p>
          <p>Description: {service?.description}</p>
        </div>
      </Card>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormDatePicker name="date" label="Select Booking Date" />
          </Col>
        </Row>
        <input type="date" />

        <Button type="primary" htmlType="submit">
          Book Service
        </Button>
      </Form>
    </div>
  );
};

export default BookingPage;
