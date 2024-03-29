import { useServiceQuery } from "@/redux/api/serviceApi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { DatePickerProps } from "antd";
import { Button, Col, DatePicker, Modal, Row } from "antd";
import { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handleBooking: (data: any) => void;
  title?: string;
}

const ConfirmBookingModal = ({
  id,
  handleBooking,
  title,
}: IConfirmModelProps) => {
  const { data, isLoading } = useServiceQuery(id);
  const dateRef = useRef<string | Dayjs | null>();

  useEffect(() => {
    // Update the ref when data changes
    dateRef.current = undefined;
  }, [data]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    dateRef.current = date;
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
    price: "$" + data?.price || "",
    status: data?.status || "",
    categoryId: data?.categoryId || "",
    location: data?.location || "",
  };

  const showConfirm = () => {
    confirm({
      okText: "Confirm",
      title: title || "Do you Want to booked this item?",
      icon: <ExclamationCircleFilled />,
      content: (
        <Form defaultValues={defaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput name="title" label="Title" readOnly />
            </Col>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput name="price" label="Price" readOnly />
            </Col>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput name="location" label="Location" readOnly />
            </Col>

            <Col span={24} style={{ margin: "10px 0" }}>
              <label>*Please select a date</label>
              <DatePicker
                onChange={onChange}
                style={{ width: "100%" }}
                size="large"
              />
            </Col>
          </Row>
        </Form>
      ),
      async onOk() {
        const data = {
          date: dateRef.current,
          serviceId: id,
        };

        console.log(data);
        handleBooking(data);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Button onClick={showConfirm} type="primary">
      Booking
    </Button>
  );
};

export default ConfirmBookingModal;
