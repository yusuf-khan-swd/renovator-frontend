import SignupPage from "@/components/Logins/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovator | Signup",
};

const Login = () => {
  return (
    <>
      <SignupPage />
    </>
  );
};

export default Login;
