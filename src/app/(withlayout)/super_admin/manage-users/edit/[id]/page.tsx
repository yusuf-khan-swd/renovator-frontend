"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { roleOptionsForSuperAdmin } from "@/constants/global";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import Link from "next/link";

const EditUserPage = ({ params }: any) => {
  const id = params?.id;
  const { data, isLoading } = useUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");
      // console.log(data);
      await updateUser(data);

      message.success("User updated successfully");
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    id: data?.id,
    name: data?.name || "",
    email: data?.email || "",
    role: data?.role || "",
  };

  const { role } = getUserInfo() as any;

  return (
    <div>
      <CommonBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: `manage-users`,
            link: `/${role}/manage-users`,
          },
          {
            label: "edit",
            link: `/${role}/manage-users/edit`,
          },
        ]}
      />

      <div style={{ padding: "20px" }}>
        <h1>Update User Information</h1>

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
              <FormSelectField
                name="role"
                label="User Role"
                options={roleOptionsForSuperAdmin as SelectOptions[]}
              />
            </Col>
          </Row>

          <Button
            htmlType="submit"
            style={{
              margin: "2px",
            }}
            onClick={() => console.log(data)}
            type="primary"
          >
            Update
          </Button>

          <Link href={`/${role}/manage-users/details/${id}`}>
            <Button style={{ margin: "2px" }} type="default">
              Details
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default EditUserPage;
