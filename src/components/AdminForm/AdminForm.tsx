"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useCreateAdminMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Row, message } from "antd";
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

      if (result?.data) message.success("Admin created successfully!");
      else message.error("Admin create failed!");
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
              Create an admin account
            </h1>
            <div>
              <Form
                submitHandler={onSubmit}
                resolver={yupResolver(userSchema)}
                defaultValues={defaultValues}
              >
                <Col style={{ margin: "10px 0px" }}>
                  <FormInput name="name" label="Name" required />
                </Col>
                <Col style={{ margin: "10px 0px" }}>
                  <FormInput name="email" type="text" label="Email" required />
                </Col>
                <Col style={{ margin: "10px 0px" }}>
                  <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    required
                  />
                </Col>
                <Col style={{ margin: "10px 0px" }}>
                  <Button type="primary" htmlType="submit">
                    Create Admin
                  </Button>
                </Col>
              </Form>
              <p style={{ margin: "8px 4px" }}>
                Create user account?{" "}
                <Link href={`/super_admin/manage-users/create-user`}>
                  Link{" "}
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdminForm;
