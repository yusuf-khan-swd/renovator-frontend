import LoginPage from "@/components/Logins/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovator | Login",
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
