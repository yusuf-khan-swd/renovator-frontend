import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";

interface IReviewProps {
  data: any;
}

const ConfirmModalReviewContent = ({ data }: IReviewProps) => {
  const statusColor = `${
    data?.service?.status === ENUM_SERVICE_STATUS.AVAILABLE
      ? "green"
      : data?.service?.status === ENUM_SERVICE_STATUS.UPCOMING
      ? "blue"
      : "red"
  }`;

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Name: <span style={{ fontWeight: "bold" }}>{data?.user?.name}</span>
      </p>
      <p>
        Email: <span style={{ fontWeight: "bold" }}>{data?.user?.email}</span>
      </p>
      <p>
        Service Status:{" "}
        <span style={{ fontWeight: "bold", color: statusColor }}>
          {data?.service?.status?.charAt(0)?.toUpperCase() +
            data?.service?.status?.slice(1)}
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
        Rating: <span style={{ fontWeight: "bold" }}>{data?.rating}</span>
      </p>
      <p>
        Review: <span style={{ fontWeight: "bold" }}>{data?.review}</span>
      </p>
    </div>
  );
};

export default ConfirmModalReviewContent;
