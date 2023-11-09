import { useServiceQuery } from "@/redux/api/serviceApi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Col, Modal, Row, message } from "antd";
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
  const dateRef = useRef<string>();
  const { data, isLoading } = useServiceQuery(id);

  useEffect(() => {
    // Update the ref when data changes
    dateRef.current = undefined;
  }, [data]);

  const onSubmit = async (data: any) => {
    try {
      // message.loading("Creating.....");
      console.log(data);
      // await updateService(data);
      // message.success("Service updated successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
    status: data?.status || "",
    categoryId: data?.categoryId || "",
    location: data?.location || "",
  };

  const showConfirm = () => {
    confirm({
      title: title || "Do you Want to booked this item?",
      icon: <ExclamationCircleFilled />,
      content: (
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
              <input
                type="date"
                onChange={(e) => {
                  dateRef.current = e.target.value;
                }}
                style={{ width: "100%", borderRadius: "8px", padding: "8px" }}
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
