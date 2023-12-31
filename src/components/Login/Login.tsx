"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { loginSchema } from "@/schemas/login";
import { storeUserInfo } from "@/services/auth.service";
import { HomeOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login-image.png";
import "./login.css";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Login trying...");
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/profile");
        message.success("User logged in successfully!");
      } else {
        message.error("Logged in Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    email: "yusuf3@gmail.com",
    password: "123456",
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        margin: "4px",
      }}
    >
      <Col className="login-image" lg={10}>
        <Image
          src={loginImage}
          alt="login image"
          style={{ objectFit: "contain", maxWidth: "100%" }}
        />
      </Col>
      <Col lg={8}>
        <Link href="/home">
          <Button type="primary">
            <HomeOutlined />
            Go Back
          </Button>
        </Link>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(loginSchema)}
            defaultValues={defaultValues}
          >
            <div>
              <FormInput
                name="email"
                type="text"
                size="large"
                label="Email"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                required
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <p style={{ margin: "8px 4px" }}>
            New to website? <Link href="/signup">Signup</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
