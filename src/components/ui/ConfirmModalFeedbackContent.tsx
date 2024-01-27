import getWordFromString from "@/helpers/getWordFromString";

interface IFeedbackProps {
  data: { name: string; email: string; rating: number; review: string };
}

const ConfirmModalFeedbackContent = ({ data }: IFeedbackProps) => {
  const name = data?.name;
  const email = data?.email;
  const rating = data?.rating;
  const review = getWordFromString(data?.review, 80);

  const fontBold = { fontWeight: "bold" };

  return (
    <div style={{ display: "grid", gap: "4px" }}>
      <p>
        <span style={fontBold}>Name:</span> {name}
      </p>
      <p>
        <span style={fontBold}>Email:</span> {email}
      </p>
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
