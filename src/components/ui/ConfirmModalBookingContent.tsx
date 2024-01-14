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

  const fontBold = { fontWeight: "bold" };

  const statusColor = `${
    data?.status === ENUM_BOOKING_STATUS.ACCEPT
      ? "green"
      : data?.status === ENUM_BOOKING_STATUS.PENDING
      ? "blue"
      : "red"
  }`;

  const capitalizeStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        User Email: <span style={fontBold}>{email}</span>
      </p>
      <p>
        Booking Date:{" "}
        <span style={fontBold}>{dayjs(date).format("MMM D, YYYY")}</span>
      </p>
      <p>
        Current Status:{" "}
        <span style={{ ...fontBold, color: statusColor }}>
          {capitalizeStatus}
        </span>
      </p>
      <p>
        Service Name: <span style={fontBold}>{title}</span>
      </p>
      <p>
        Service Price: <span style={fontBold}>${price}</span>
      </p>
    </div>
  );
};

export default ConfirmModalBookingContent;
