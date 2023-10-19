"use client";

import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { bookingStatusOptions } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useBookingQuery(id);
  const [date, setDate] = useState<string>();

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
