import { ENUM_SERVICE_STATUS } from "@/constants/serviceStatus";
import { IService } from "@/types";

interface IServiceProps {
  service: IService;
}

const ConfirmModalServiceContent = ({ service }: IServiceProps) => {
  const title = service?.title;
  const price = service?.price;
  const location = service?.location;
  const status = service?.status;
  const category = service?.category?.title;

  const fontBold = { fontWeight: "bold" };

  const serviceStatusColor =
    status === ENUM_SERVICE_STATUS.AVAILABLE ? "green" : "blue";

  const capitalizeStatus = status.charAt(0).toUpperCase() + status.slice(1);
  const capitalizeLocation =
    location.charAt(0).toUpperCase() + location.slice(1);

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Service Name: <span style={fontBold}>{title}</span>
      </p>
      <p>
        Price: <span style={fontBold}>${price}</span>
      </p>
      <p>
        Location: <span style={fontBold}>{capitalizeLocation}</span>
      </p>
      <p>
        Status:{" "}
        <span style={{ ...fontBold, color: serviceStatusColor }}>
          {capitalizeStatus}
        </span>
      </p>
      <p>
        Category: <span style={fontBold}>{category}</span>
      </p>
    </div>
  );
};

export default ConfirmModalServiceContent;
