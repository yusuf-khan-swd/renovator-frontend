"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import type { DatePickerProps } from "antd";
import { Button, Card, Col, DatePicker, Row, message } from "antd";
import { useForm } from "react-hook-form";

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
      const result: any = await createBooking(data);
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

  const { handleSubmit, register, setValue } = useForm();

  const dateSubmit = (data: any) => {
    console.log(data);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setValue("date2", date);
  };

  return (
    <div>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          <Card title={service?.title}>
            <div style={{ paddingBottom: "15px", fontSize: "16px" }}>
              <p>Category: {service?.category?.title}</p>
              <p>Price: ${service?.price}</p>
              <p>
                Status:{" "}
                <span style={{ color: "green" }}>{service?.status}</span>
              </p>
              <p>Location: {service?.location}</p>
              <p>Description: {service?.description}</p>
            </div>
          </Card>
          <form onSubmit={handleSubmit(dateSubmit)}>
            <DatePicker onChange={onChange} />
            <Button htmlType="submit">Submit</Button>
          </form>
          <Form submitHandler={onSubmit}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormDatePicker name="date" label="Select Booking Date" />
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Book Service
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
