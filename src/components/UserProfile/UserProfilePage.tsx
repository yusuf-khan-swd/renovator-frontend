"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row } from "antd";
import Link from "next/link";
import FormHeading from "../ui/FormHeading";
import ProfileBreadCrumb from "./ProfileBreadCrumb";

const UserProfilePage = () => {
  const { userId } = getUserInfo() as any;

  const { data, isLoading } = useProfileQuery(userId);

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role.toUpperCase() || "",
  };

  return (
    <>
      <ProfileBreadCrumb />

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ margin: "24px 5px" }}>
          <Card>
            <FormHeading title="User Profile" />
            <Form defaultValues={defaultValues}>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="name" label="Name" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="email" label="Email" readOnly />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    readOnly
                  />
                </Col>
              </Row>
              <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                  <FormInput name="role" label="User Role" readOnly />
                </Col>
              </Row>
            </Form>
            <Link href={`/profile/edit/${data?.id}`}>
              <Button
                style={{ margin: "2px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                Edit
              </Button>
            </Link>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
