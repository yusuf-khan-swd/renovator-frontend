"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import ServiceDetailsCard from "@/components/Service/ServiceDetailsCard";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { bookingStatusOptionsForAdmin } from "@/constants/global";
import {
  useBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row, message } from "antd";

const EditBooking = ({ id }: { id: string }) => {
  const { data: booking, isLoading: isBookingDataLoading } =
    useBookingQuery(id);

  const service = booking?.service;
  const user = booking?.user;

  const [updateBooking] = useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      data.id = id;

      delete data?.userName;
      delete data?.userEmail;

      const result: any = await updateBooking(data);

      if (result?.data) message.success("Booking updated successfully");
      else message.error("Booking updated failed");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    date: booking?.date || "",
    status: booking?.status || "",
    userName: user?.name || "",
    userEmail: user?.email || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = "manage-bookings";
  const endRoute = "edit";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />
      {isBookingDataLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "20px 8px", display: "grid", gap: "24px" }}>
          <Card>
            <h2>Update Booking Information</h2>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="userName" label="User Name" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="userEmail" label="User Email" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormDatePicker name="date" label="Booking Date" required />
                </Col>
              </Row>

              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="status"
                    label="Status"
                    options={bookingStatusOptionsForAdmin as SelectOptions[]}
                    required
                  />
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form>
          </Card>

          <ServiceDetailsCard service={service} />
        </div>
      )}
    </div>
  );
};

export default EditBooking;
