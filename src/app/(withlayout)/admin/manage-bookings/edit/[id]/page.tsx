"use client";

import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ServiceDetailsCard from "@/components/Service/ServiceDetailsCard";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { bookingStatusOptions } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, DatePicker, DatePickerProps, Row, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useBookingQuery(id);
  console.log(data);
  const [date, setDate] = useState<string>();

  const { data: service, isLoading: serviceIsLoading } = useServiceQuery(
    data?.serviceId
  );
  console.log(service);

  const { handleSubmit, setValue } = useForm();
  const [dateSelected, setDateSelected] = useState<boolean>(false);

  const [updateBooking] = useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      data.id = id;
      data.date = date;
      const result: any = await updateBooking(data);
      if (result?.data) {
        message.success("Booking updated successfully");
      } else {
        message.error("Booking updated failed");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const defaultValues = {
    date: data?.date || "",
    status: data?.status || "",
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setValue("date", date);
    setDateSelected(true);
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
      <div>
        {serviceIsLoading ? (
          <FullScreenLoading />
        ) : (
          <ServiceDetailsCard service={service} />
        )}
      </div>

      <h1>Update Booking</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <label>*Select Date</label>
            <input
              name="date"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", borderRadius: "8px", padding: "8px" }}
              defaultValue={defaultValues?.date}
            />
            <DatePicker
              name="date"
              size="large"
              onChange={onChange}
              style={{ width: "100%" }}
              defaultValue={dayjs(data?.date)}
            />
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
