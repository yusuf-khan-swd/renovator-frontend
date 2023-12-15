interface IServiceProps {
  data: any;
}

const ConfirmModalServiceContent = ({ data }: IServiceProps) => {
  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Service Name: <span style={{ fontWeight: "bold" }}>{data?.title}</span>
      </p>
      <p>
        Price: <span style={{ fontWeight: "bold" }}>${data?.price}</span>
      </p>
      <p>
        Location:{" "}
        <span style={{ fontWeight: "bold" }}>
          {data?.location.charAt(0).toUpperCase() + data?.location.slice(1)}
        </span>
      </p>
      <p>
        Status:{" "}
        <span style={{ fontWeight: "bold" }}>
          {data?.status.charAt(0).toUpperCase() + data?.status.slice(1)}
        </span>
      </p>
      <p>
        Category:{" "}
        <span style={{ fontWeight: "bold" }}>{data?.category?.title}</span>
      </p>
    </div>
  );
};

export default ConfirmModalServiceContent;
