import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
  name: yup.string().required("Your name is required"),
  email: yup.string().required("Your email is required"),
  rating: yup.string().required("Rating is required"),
  review: yup.string().required("Review is required"),
});
