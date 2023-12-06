import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6)
    .max(32)
    .required(),
});
