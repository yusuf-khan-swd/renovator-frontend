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

  return (
    <div style={{ display: "grid", gap: "2px" }}>
      <p>
        Name: <span style={{ fontWeight: "bold" }}>{name}</span>
      </p>
      <p>
        Email: <span style={{ fontWeight: "bold" }}>{email}</span>
      </p>
      <p>
        Service Name: <span style={{ fontWeight: "bold" }}>{title}</span>
      </p>
      <p>
        Rating: <span style={{ fontWeight: "bold" }}>{rating}</span>
      </p>
      <p>
        Review: <span style={{ fontWeight: "bold" }}>{review}</span>
      </p>
    </div>
  );
};

export default ConfirmModalReviewContent;
