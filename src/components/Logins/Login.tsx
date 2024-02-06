"use client";

import loginImage from "@/assets/login-image.png";
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
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import "./login.css";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("yusuf3@gmail.com");
  const [userPassword, setUserPassword] = useState("123456");

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Login trying...");
      const res = await userLogin({ ...data }).unwrap();

      if (res?.accessToken) {
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/profile");
        message.success("User logged in successfully!");
      } else {
        message.error("Logged in Failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const defaultValues = {
    email: userEmail,
    password: userPassword,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1580px",
        margin: "0 auto",
        padding: "8px",
        display: "grid",
        alignContent: "center",
      }}
    >
      <Row justify="center" align="middle">
        <Col className="login-image" xl={10}>
          <Image src={loginImage} width={500} alt="login image" />
        </Col>
        <Col xl={8}>
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

        <Col sm={12} lg={4} xl={6}>
          <div
            style={{
              margin: "8px",
              display: "grid",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <div>
              <p>
                User Email:{" "}
                <span style={{ fontWeight: "bold" }}>yusuf3@gmail.com</span>
              </p>
              <p>
                Password: <span style={{ fontWeight: "bold" }}>123456</span>
              </p>
              <Button
                size="small"
                onClick={() => {
                  setUserEmail("yusuf3@gmail.com");
                  setUserPassword("123456");
                }}
              >
                click{" "}
              </Button>
            </div>
            <div>
              <p>
                Admin Email:{" "}
                <span style={{ fontWeight: "bold" }}>yusuf2@gmail.com</span>
              </p>
              <p>
                Password: <span style={{ fontWeight: "bold" }}>123456</span>
              </p>
              <Button
                size="small"
                onClick={() => {
                  setUserEmail("yusuf2@gmail.com");
                  setUserPassword("123456");
                }}
              >
                click{" "}
              </Button>
            </div>
            <div>
              <p>
                Super Admin Email:{" "}
                <span style={{ fontWeight: "bold" }}>yusuf@gmail.com </span>
              </p>
              <p>
                Password: <span style={{ fontWeight: "bold" }}>123456</span>
              </p>
              <Button
                size="small"
                onClick={() => {
                  setUserEmail("yusuf@gmail.com");
                  setUserPassword("123456");
                }}
              >
                click{" "}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
