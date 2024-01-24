const ConfirmModalTitle = ({ data }: { data: string }) => {
  return (
    <p>
      Do you want to <span style={{ color: "red" }}>Delete</span> this {data}?
    </p>
  );
};

export default ConfirmModalTitle;
