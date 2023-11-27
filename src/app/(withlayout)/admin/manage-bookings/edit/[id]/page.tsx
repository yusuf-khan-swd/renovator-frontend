"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
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
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row, message } from "antd";

const EditServicePage = ({ params }: any) => {
  const id = params?.id;
  const { data: booking, isLoading: isBookingDataLoading } =
    useBookingQuery(id);

  const { data: service, isLoading: isServiceDataLoading } = useServiceQuery(
    booking?.serviceId
  );

  const [updateBooking] = useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      data.id = id;
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
    date: booking?.date || "",
    status: booking?.status || "",
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
      <div style={{ margin: "20px 8px", display: "grid", gap: "24px" }}>
        <div>
          {isBookingDataLoading || isServiceDataLoading ? (
            <FullScreenLoading />
          ) : (
            <ServiceDetailsCard service={service} />
          )}
        </div>

        {isBookingDataLoading ? (
          <FullScreenLoading />
        ) : (
          <Card>
            <h1>Update Booking</h1>
            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormDatePicker name="date" />
                </Col>
              </Row>

              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col span={8} style={{ margin: "10px 0" }}>
                  <FormSelectField
                    name="status"
                    label="Status"
                    options={bookingStatusOptionsForAdmin as SelectOptions[]}
                  />
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EditServicePage;
