import { IService } from "@/types";

interface IServiceCardBodyProps {
  service: IService;
  detailsPage?: boolean;
}

const ServiceCardBody = ({
  service,
  detailsPage = false,
}: IServiceCardBodyProps) => {
  return (
    <div
      style={{
        paddingBottom: "15px",
        display: "grid",
        gap: "2px",
      }}
    >
      <p>Category: {service?.category?.title}</p>
      <p>
        Price: <span style={{ fontWeight: "bold" }}>${service?.price}</span>
      </p>
      <p>
        Status:{" "}
        <span style={{ color: "green" }}>
          {service?.status.charAt(0).toUpperCase() + service?.status.slice(1)}
        </span>
      </p>
      <p>Location: {service?.location}</p>
      <p style={{ padding: "5px 0" }}>
        <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
        {detailsPage ? (
          <span>{service?.description}</span>
        ) : (
          <span>
            {service?.description.length <= 150
              ? service?.description
              : service?.description.slice(0, 150) + "..."}
          </span>
        )}
      </p>
    </div>
  );
};

export default ServiceCardBody;
