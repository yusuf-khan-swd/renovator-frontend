import { Card, Col } from "antd";

const ReviewCard = ({ review }: { review: any }) => {
  return (
    <Col span={24} style={{ margin: "10px 0" }}>
      <Card>
        <p>User: {review?.user?.email}</p>
        <p>Rating: {review?.rating}</p>
        <p>Review: {review?.review}</p>
      </Card>
    </Col>
  );
};

export default ReviewCard;
