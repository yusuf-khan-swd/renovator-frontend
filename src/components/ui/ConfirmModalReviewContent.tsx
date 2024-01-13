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

  const boldColor = { fontWeight: "bold" };

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Name: <span style={boldColor}>{name}</span>
      </p>
      <p>
        Email: <span style={boldColor}>{email}</span>
      </p>
      <p>
        Service Name: <span style={boldColor}>{title}</span>
      </p>
      <p>
        Rating: <span style={boldColor}>{rating}</span>
      </p>
      <p>
        Review: <span style={boldColor}>{review}</span>
      </p>
    </div>
  );
};

export default ConfirmModalReviewContent;
