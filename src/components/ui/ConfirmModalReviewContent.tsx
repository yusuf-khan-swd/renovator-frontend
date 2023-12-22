interface IReviewProps {
  data: any;
}

const ConfirmModalReviewContent = ({ data }: IReviewProps) => {
  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Name: <span style={{ fontWeight: "bold" }}>{data?.user?.name}</span>
      </p>
      <p>
        Email: <span style={{ fontWeight: "bold" }}>{data?.user?.email}</span>
      </p>
      <p>
        Service Name:{" "}
        <span style={{ fontWeight: "bold" }}>{data?.service?.title}</span>
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
