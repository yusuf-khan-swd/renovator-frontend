import { useServiceReviewsQuery } from "@/redux/api/reviewApi";
import { Row } from "antd";
import CenterLoading from "../Loading/CenterLoading";
import ReviewCard from "./ReviewCard";

interface IReviewsProps {
  serviceId: string;
}

const Reviews = ({ serviceId }: IReviewsProps) => {
  const { data: reviews, isLoading: isReviewLoading } =
    useServiceReviewsQuery(serviceId);
  return (
    <div>
      {isReviewLoading ? (
        <CenterLoading />
      ) : (
        <Row
          gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
          style={{ maxWidth: "450px", margin: "10px auto" }}
        >
          {reviews?.map((review: any) => (
            <ReviewCard review={review} key={review?.id} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Reviews;
