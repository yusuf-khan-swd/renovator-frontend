import SignupPage from "@/components/Logins/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovator | Signup",
};

const Signup = () => {
  return <SignupPage />;
};

export default Signup;
