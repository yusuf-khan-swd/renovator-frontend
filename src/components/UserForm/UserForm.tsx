"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login-image.png";

type FormValues = {
  id: string;
  password: string;
};

const UserForm = () => {
  const [userSignup] = useUserSignupMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Creating...");
      const result: any = await userSignup({ ...data });
      // console.log(result?.data);

      if (result?.data) {
        message.success("User created successfully!");
      } else {
        message.error("User create Failed!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
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
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Create an user account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(userSchema)}>
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
              Create User
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default UserForm;
