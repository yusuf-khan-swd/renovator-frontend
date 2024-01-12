import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";

interface IServiceProps {
  service: any;
}

const ConfirmModalServiceContent = ({ service }: IServiceProps) => {
  const serviceStatusColor =
    service?.status === ENUM_SERVICE_STATUS.AVAILABLE ? "green" : "blue";

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Service Name:{" "}
        <span style={{ fontWeight: "bold" }}>{service?.title}</span>
      </p>
      <p>
        Price: <span style={{ fontWeight: "bold" }}>${service?.price}</span>
      </p>
      <p>
        Location:{" "}
        <span style={{ fontWeight: "bold" }}>
          {service?.location.charAt(0).toUpperCase() +
            service?.location.slice(1)}
        </span>
      </p>
      <p>
        Status:{" "}
        <span style={{ fontWeight: "bold", color: serviceStatusColor }}>
          {service?.status.charAt(0).toUpperCase() + service?.status.slice(1)}
        </span>
      </p>
      <p>
        Category:{" "}
        <span style={{ fontWeight: "bold" }}>{service?.category?.title}</span>
      </p>
    </div>
  );
};

export default ConfirmModalServiceContent;
