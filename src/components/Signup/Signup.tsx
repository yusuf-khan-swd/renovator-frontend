"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";
import { HomeOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login-image.png";

type FormValues = {
  id: string;
  password: string;
};

const SignupPage = () => {
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Creating...");
      const result: any = await userSignup({ ...data });
      // console.log(result?.data);

      if (result?.data) {
        message.success("User created successfully!");
        router.push("/login");
      } else {
        message.error("User create Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
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
          Create an account
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(userSchema)}
            defaultValues={defaultValues}
          >
            <div>
              <FormInput
                name="name"
                type="text"
                size="large"
                label="Name"
                required
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="text"
                size="large"
                label="Email"
                required
              />
            </div>
            <div>
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                required
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                margin: "10px 0px",
              }}
            >
              Signup
            </Button>
          </Form>
          <p style={{ margin: "8px 4px" }}>
            Already have account? <Link href="/login">Login</Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default SignupPage;
