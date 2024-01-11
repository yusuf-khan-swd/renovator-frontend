"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useProfileQuery } from "@/redux/api/profileApi";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

const UserProfile = () => {
  const { data, isLoading } = useProfileQuery(undefined);

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role.toUpperCase() || "",
  };

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card style={{ margin: "20px 8px" }}>
          <h3 style={{ fontSize: "26px" }}>User Profile</h3>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="name" label="Name" readOnly />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="email" label="Email" readOnly />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput
                  type="password"
                  name="password"
                  label="Password"
                  readOnly
                />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: "10px 0" }}>
                <FormInput name="role" label="User Role" readOnly />
              </Col>
            </Row>
          </Form>
          <Link href={`/profile/edit/${data?.id}`}>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => console.log(data)}
              type="primary"
            >
              Edit
            </Button>
          </Link>
        </Card>
      )}
    </>
  );
};

export default UserProfile;
