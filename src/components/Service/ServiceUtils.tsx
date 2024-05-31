const MIN_MAX_PRICE = "min_max";
const MAX_MIN_PRICE = "max_min";
const SERVICE_NAME_ASC = "service_name_asc";
const SERVICE_NAME_DESC = "service_name_desc";
const SERVICE_LOCATION_ASC = "service_location_asc";
const SERVICE_LOCATION_DESC = "service_location_desc";
const SERVICE_STATUS_ASC = "service_status_asc";
const SERVICE_STATUS_DESC = "service_status_desc";

export const ServiceSortBySelectOptions = () => {
  return [
    { label: "Any", value: "" },
    { label: "Price - Asc", value: MIN_MAX_PRICE },
    { label: "Price - Desc", value: MAX_MIN_PRICE },
    { label: "Service Name  - Asc", value: SERVICE_NAME_ASC },
    { label: "Service Name  - Desc", value: SERVICE_NAME_DESC },
    { label: "Location  - Asc", value: SERVICE_LOCATION_ASC },
    { label: "Location  - Desc", value: SERVICE_LOCATION_DESC },
    { label: "Status  - Asc", value: SERVICE_STATUS_ASC },
    { label: "Status  - Desc", value: SERVICE_STATUS_DESC },
  ];
};
