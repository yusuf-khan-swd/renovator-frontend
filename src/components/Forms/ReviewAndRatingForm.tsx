import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { ratingOptions } from "@/constants/global";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { reviewAndRatingSchema } from "@/schemas/reviewAndRating";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
import ReviewAndRatingHeading from "../ReviewAndRating/ReviewAndRatingHeading";

interface IReviewAndRatingProps {
  serviceId: string;
}

const ReviewAndRatingForm = ({ serviceId }: IReviewAndRatingProps) => {
  const [createReview] = useCreateReviewMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Creating.....");
      data.serviceId = serviceId;
      data.rating = parseInt(data.rating);
      const result: any = await createReview(data);
      // console.log(result);
      if (result?.data) {
        message.success("Review and Rating added successfully");
      } else {
        message.error("Review and rating failed to add!");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <Card>
        <ReviewAndRatingHeading heading="Give a review and rating" />
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(reviewAndRatingSchema)}
        >
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="rating"
                label="Rating"
                options={ratingOptions as SelectOptions[]}
                required
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={16} style={{ margin: "10px 0" }}>
              <FormTextArea
                name="review"
                label="Review Description"
                rows={5}
                required
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit a Review
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ReviewAndRatingForm;
