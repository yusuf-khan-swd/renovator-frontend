"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import type { DatePickerProps } from "antd";
import { Button, Card, Col, DatePicker, Row, message } from "antd";
import { useState } from "react";
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

  const { handleSubmit, setValue } = useForm();
  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const dateSubmit = async (data: any) => {
    console.log(data);
    // TODO:  date: M {
    //   '$L': 'en',
    //   '$u': undefined,
    //   '$d': new Date('2025-02-13T06:04:30.000Z'),
    //   '$y': 2025,
    //   '$M': 1,
    //   '$D': 13,
    //   '$W': 4,
    //   '$H': 12,
    //   '$m': 4,
    //   '$s': 30,
    //   '$ms': 597,
    //   '$x': {},
    //   '$isDayjsObject': true
    // }

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
      setDateSelected(false);
    } catch (err: any) {
      setDateSelected(false);
      console.error(err.message);
      message.error(err.message);
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    //TODO:  date = M {
    //   '$L': 'en',
    //   '$u': undefined,
    //   '$d': new Date('2023-12-21T06:04:30.000Z'),
    //   '$y': 2023,
    //   '$M': 11,
    //   '$D': 21,
    //   '$W': 4,
    //   '$H': 12,
    //   '$m': 4,
    //   '$s': 30,
    //   '$ms': 597,
    //   '$x': {},
    //   '$isDayjsObject': true
    // }
    setValue("date", date);
    setDateSelected(true);
  };

  return (
    <div>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          <Card title={service?.title}>
            <div style={{ paddingBottom: "15px" }}>
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={dateSelected ? false : true}
            >
              Submit
            </Button>
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
