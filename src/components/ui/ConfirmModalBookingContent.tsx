import { ENUM_BOOKING_STATUS } from "@/constants/bookingStatus";
import { IBooking } from "@/types";
import dayjs from "dayjs";

interface IBookingProps {
  data: IBooking;
}

const ConfirmModalBookingContent = ({ data }: IBookingProps) => {
  const email = data?.user?.email;
  const date = data?.date;
  const status = data?.status;
  const title = data?.service?.title;
  const price = data?.service?.price;

  const statusColor = `${
    data?.status === ENUM_BOOKING_STATUS.ACCEPT
      ? "green"
      : data?.status === ENUM_BOOKING_STATUS.PENDING
      ? "blue"
      : "red"
  }`;

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        User Email:{" "}
        <span style={{ fontWeight: "bold" }}>{data?.user?.email}</span>
      </p>
      <p>
        Booking Date:{" "}
        <span style={{ fontWeight: "bold" }}>
          {dayjs(data?.date).format("MMM D, YYYY")}
        </span>
      </p>
      <p>
        Current Status:{" "}
        <span style={{ fontWeight: "bold", color: statusColor }}>
          {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
        </span>
      </p>
      <p>
        Service Name:{" "}
        <span style={{ fontWeight: "bold" }}>{data?.service?.title}</span>
      </p>
      <p>
        Service Price:{" "}
        <span style={{ fontWeight: "bold" }}>${data?.service?.price}</span>
      </p>
    </div>
  );
};

export default ConfirmModalBookingContent;
