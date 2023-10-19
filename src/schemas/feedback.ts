import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().required("Email is required"),
  rating: yup.string().required("Rating is required"),
  review: yup.string().required("Review is required"),
});
