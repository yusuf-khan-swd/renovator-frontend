interface IFaqAndBlogProps {
  data: { title: string; description: string };
}

const ConfirmModalManageContentsBody = ({ data }: IFaqAndBlogProps) => {
  const title = data?.title;
  const description = data?.description;

  const fontBold = { fontWeight: "bold" };

  return (
    <div style={{ display: "grid", gap: "4px" }}>
      <p style={{ fontSize: "15px" }}>
        <span style={fontBold}>Title:</span> {title}
      </p>
      <p>
        <span style={fontBold}>Description:</span> {description}
      </p>
    </div>
  );
};

export default ConfirmModalManageContentsBody;
