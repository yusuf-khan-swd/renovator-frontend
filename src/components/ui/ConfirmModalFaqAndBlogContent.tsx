interface IFaqAndBlogProps {
  data: { title: string; description: string };
}

const ConfirmModalFaqAndBlogContent = ({ data }: IFaqAndBlogProps) => {
  return (
    <div style={{ display: "grid", gap: "4px" }}>
      <p style={{ fontSize: "15px" }}>
        <span style={{ fontWeight: "bold" }}>Title:</span> {data?.title}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
        {data?.description}
      </p>
    </div>
  );
};

export default ConfirmModalFaqAndBlogContent;
