"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useCreateAdminMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";
import loginImage from "../../assets/login-image.png";

type FormValues = {
  id: string;
  password: string;
};

const AdminForm = () => {
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Creating...");
      const result: any = await createAdmin({ ...data });
      if (result?.data) {
        message.success("Admin created successfully!");
      } else {
        message.error("Admin create failed!");
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
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Create an admin account
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
              Create Admin
            </Button>
          </Form>
          <p style={{ margin: "8px 4px" }}>
            Create user account?{" "}
            <Link href={`/super_admin/manage-users/create-user`}>Link </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default AdminForm;
