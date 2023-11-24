import { useServiceReviewsQuery } from "@/redux/api/reviewApi";
import { Card, Row } from "antd";
import FullScreenLoading from "../Loading/FullScreenLoading";
import ReviewAndRatingHeading from "../ReviewAndRating/ReviewAndRatingHeading";
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
        <FullScreenLoading />
      ) : reviews?.length < 1 ? (
        <p>No review available</p>
      ) : (
        <Card bordered={false}>
          <ReviewAndRatingHeading heading="Users reviews and ratings" />

          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            {reviews?.map((review: any) => (
              <ReviewCard review={review} key={review?.id} />
            ))}
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Reviews;
