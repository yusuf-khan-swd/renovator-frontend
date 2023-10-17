import * as yup from "yup";

export const categorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
