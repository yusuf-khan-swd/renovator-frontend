import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handleBooking: (id: string) => void;
  title?: string;
}

const ConfirmBookingModal = ({
  id,
  handleBooking,
  title,
}: IConfirmModelProps) => {
  const showConfirm = () => {
    confirm({
      title: title || "Do you Want to booked this item?",
      icon: <ExclamationCircleFilled />,
      content: <input type="datetime-local" />,
      async onOk() {
        handleBooking(id);
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
