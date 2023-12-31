"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import {
  roleOptionsForAdmin,
  roleOptionsForSuperAdmin,
  roleOptionsForUser,
} from "@/constants/global";
import { ENUM_USER_ROLE } from "@/constants/role";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";

const EditProfilePage = () => {
  const { data, isLoading } = useProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      const result: any = await updateProfile(data);
      if (result?.data) {
        message.success("Profile updated successfully");
      } else {
        message.error("Profile update failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
    password: data?.password || "",
    role: data?.role || "",
  };

  const { role }: { role: string } = getUserInfo() as any;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "profile",
            link: `/profile`,
          },
        ]}
      />

      <Card style={{ margin: "20px 8px" }}>
        <h3 style={{ fontSize: "26px" }}>Update User Profile</h3>

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
              <FormSelectField
                name="role"
                label="User Role"
                options={
                  role === ENUM_USER_ROLE.SUPER_ADMIN
                    ? roleOptionsForSuperAdmin
                    : role === ENUM_USER_ROLE.ADMIN
                    ? roleOptionsForAdmin
                    : (roleOptionsForUser as SelectOptions[])
                }
              />
            </Col>
          </Row>
          <Button htmlType="submit" style={{ margin: "2px" }} type="primary">
            Update
          </Button>
          <Link href="/profile">
            <Button style={{ margin: "2px" }} type="default">
              View Profile
            </Button>
          </Link>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfilePage;
