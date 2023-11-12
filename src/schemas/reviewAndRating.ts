import * as yup from "yup";

export const reviewAndRatingSchema = yup.object().shape({
  rating: yup.string().required("Rating is required"),
  review: yup.string().required("Review is required"),
});
