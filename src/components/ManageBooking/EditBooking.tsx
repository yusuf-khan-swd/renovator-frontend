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
import { bookingSchema } from "@/schemas/booking";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import FormHeading from "../ui/FormHeading";

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
          { label: routeName, link: `/${routeName}` },
          { label: endRoute, link: `/${routeName}/${endRoute}/${id}` },
        ]}
      />
      {isBookingDataLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "24px 5px", display: "grid", gap: "24px" }}>
          <Card>
            <FormHeading title="Update Booking Information" />
            <Form
              submitHandler={onSubmit}
              defaultValues={defaultValues}
              resolver={yupResolver(bookingSchema)}
            >
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
