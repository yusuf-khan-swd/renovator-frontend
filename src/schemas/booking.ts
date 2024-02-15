import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  status: yup.string().required("Status is required"),
  userName: yup.string().required("UserName is required"),
  userEmail: yup.string().required("UserEmail is required"),
});
