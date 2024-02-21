"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
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

      if (result?.data) message.success("User created successfully!");
      else message.error("User create Failed!");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "grid",
        alignContent: "center",
      }}
    >
      <Card>
        <Row justify="center" align="middle">
          <Col className="login-image" lg={10}>
            <Image src={loginImage} width={400} alt="login image" />
          </Col>
          <Col sm={22} md={14} lg={8}>
            <h1
              style={{
                margin: "15px 0px",
              }}
            >
              Create an user account
            </h1>
            <div>
              <Form
                submitHandler={onSubmit}
                resolver={yupResolver(userSchema)}
                defaultValues={defaultValues}
              >
                <Col>
                  <FormInput
                    name="name"
                    type="text"
                    size="large"
                    label="Name"
                    required
                  />
                </Col>
                <Col
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
                </Col>
                <Col>
                  <FormInput
                    name="password"
                    type="password"
                    size="large"
                    label="Password"
                    required
                  />
                </Col>
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
      </Card>
    </div>
  );
};

export default UserForm;
