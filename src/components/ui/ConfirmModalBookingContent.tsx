import dayjs from "dayjs";

interface IBookingProps {
  data: any;
}

const ConfirmModalBookingContent = ({ data }: IBookingProps) => {
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
        Service Name:{" "}
        <span style={{ fontWeight: "bold" }}>{data?.service?.title}</span>
      </p>
      <p>
        Service Price:{" "}
        <span style={{ fontWeight: "bold" }}>${data?.service?.price}</span>
      </p>
      <p>
        Current Status:{" "}
        <span style={{ fontWeight: "bold" }}>
          {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
        </span>
      </p>
    </div>
  );
};

export default ConfirmModalBookingContent;
