import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import { IService } from "@/types";

interface IServiceCardBodyProps {
  service: IService;
  detailsPage?: boolean;
}

const ServiceCardBody = ({
  service,
  detailsPage = false,
}: IServiceCardBodyProps) => {
  const category = service?.category?.title;
  const price = service?.price;
  const status = service?.status;
  const location = service?.location;
  const description = service?.description;

  const serviceStatusColor =
    status === ENUM_SERVICE_STATUS.AVAILABLE ? "green" : "blue";

  return (
    <div
      style={{
        paddingBottom: "15px",
        display: "grid",
        gap: "2px",
      }}
    >
      <p>Category: {category}</p>
      <p>
        Price: <span style={{ fontWeight: "bold" }}>${price}</span>
      </p>
      <p>
        Status:{" "}
        <span style={{ color: serviceStatusColor, fontWeight: "bold" }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </p>
      <p>Location: {location}</p>
      <p style={{ padding: "5px 0" }}>
        <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
        {detailsPage ? (
          <span>{description}</span>
        ) : (
          <span>
            {description.length <= 150
              ? description
              : description.slice(0, 150) + "..."}
          </span>
        )}
      </p>
    </div>
  );
};

export default ServiceCardBody;
