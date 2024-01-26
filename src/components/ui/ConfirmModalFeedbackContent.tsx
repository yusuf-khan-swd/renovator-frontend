interface IFeedbackProps {
  data: { name: string; email: string; rating: number; review: string };
}

const ConfirmModalFeedbackContent = ({ data }: IFeedbackProps) => {
  const rating = data?.rating;
  const review = data?.review;

  const fontBold = { fontWeight: "bold" };

  return (
    <div style={{ display: "grid", gap: "4px" }}>
      <p>
        <span style={fontBold}>Rating:</span> {rating}
      </p>
      <p>
        <span style={fontBold}>Reviews:</span> {review}
      </p>
    </div>
  );
};

export default ConfirmModalFeedbackContent;
