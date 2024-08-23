"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ServiceDetailsCard from "@/components/Service/ServiceDetailsCard";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import type { DatePickerProps } from "antd";
import { Button, Col, DatePicker, Row, message } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

const BookingPage = ({ id }: { id: string }) => {
  const { userId } = getUserInfo() as any;
  const { data: service, isLoading } = useServiceQuery(id);

  const [createBooking] = useCreateBookingMutation();

  const { handleSubmit, setValue } = useForm();
  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const dateSubmit = async (data: any) => {
    console.log(data);
    // TODO: need answer how it get from this date object to 2023-11-15T06:00:28.426Z like this in server
    // M {
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

      if (result?.data) message.success("Service booking successfully");
      else message.error("Service booking failed");

      setDateSelected(false);
    } catch (error: any) {
      setDateSelected(false);
      console.error(error);
      message.error(error?.message);
    }
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setValue("date", date);
    setDateSelected(true);
  };

  return (
    <div>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          <ServiceDetailsCard service={service} />
          <form onSubmit={handleSubmit(dateSubmit)}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <p style={{ marginBottom: "5px" }}>Select Booking Date</p>
                <DatePicker
                  size="large"
                  onChange={onChange}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              disabled={dateSelected ? false : true}
            >
              Book the Service
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
