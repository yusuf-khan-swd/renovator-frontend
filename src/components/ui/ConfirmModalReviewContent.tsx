import { IReviewAndRating } from "@/types";

interface IReviewProps {
  data: IReviewAndRating;
}

const ConfirmModalReviewContent = ({ data }: IReviewProps) => {
  const name = data?.user?.name;
  const email = data?.user?.email;
  const title = data?.service?.title;
  const rating = data?.rating;
  const review = data?.review;

  const fontBold = { fontWeight: "bold" };

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Name: <span style={fontBold}>{name}</span>
      </p>
      <p>
        Email: <span style={fontBold}>{email}</span>
      </p>
      <p>
        Service Name: <span style={fontBold}>{title}</span>
      </p>
      <p>
        Rating: <span style={fontBold}>{rating}</span>
      </p>
      <p>
        Review: <span style={fontBold}>{review}</span>
      </p>
    </div>
  );
};

export default ConfirmModalReviewContent;
