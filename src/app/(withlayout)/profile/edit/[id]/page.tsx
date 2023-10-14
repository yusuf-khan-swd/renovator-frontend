"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const EditProfilePage = () => {
  const { data, isLoading } = useProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      // console.log(data);
      await updateProfile(data);
      message.success("Profile updated successfully");
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role || "",
  };

  const { role } = getUserInfo() as any;
  const base = role as string;

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "profile",
            link: `/profile`,
          },
        ]}
      />

      <div style={{ padding: "20px" }}>
        <h3>{base.toUpperCase()} Profile</h3>

        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput name="name" label="Name" />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput name="email" label="Email" />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput type="password" name="password" label="Password" />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput name="role" label="User Role" />
            </Col>
          </Row>
          <Button
            htmlType="submit"
            style={{
              margin: "0px 5px",
            }}
            onClick={() => console.log(data)}
            type="primary"
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfilePage;
