"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import { roleOptionsForAdmin } from "@/constants/global";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import DashboardLink from "../DashboardLink";
import FormHeading from "../ui/FormHeading";

const EditUser = ({ id, pageRoute }: { id: string; pageRoute?: string }) => {
  const { data, isLoading } = useUserQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Updating.....");

      const result: any = await updateUser(data);

      if (result?.data) message.success("User updated successfully");
      else message.error("User updated failed");
    } catch (error: any) {
      console.error(error);
      message.error(error?.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    name: data?.name || "",
    email: data?.email || "",
    role: data?.role || "",
  };

  const { role } = getUserInfo() as any;
  const routeName = pageRoute || "manage-users";
  const endRoute = "edit";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: routeName },
          { label: endRoute, link: `${routeName}/${endRoute}/${id}` },
        ]}
      />

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card style={{ margin: "20px 8px" }}>
          <FormHeading title="Update User Information" />
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                <FormInput name="name" label="Name" />
              </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                <FormInput name="email" label="Email" />
              </Col>
            </Row>

            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col xs={24} lg={14} xl={10} style={{ margin: "10px 0" }}>
                <FormSelectField
                  name="role"
                  label="User Role"
                  options={roleOptionsForAdmin as SelectOptions[]}
                />
              </Col>
            </Row>

            <Button
              htmlType="submit"
              style={{ margin: "2px" }}
              onClick={() => console.log(data)}
              type="primary"
            >
              Update
            </Button>

            <DashboardLink pageRoute={`${routeName}/details/${id}`}>
              <Button style={{ margin: "2px" }} type="default">
                View User Info
              </Button>
            </DashboardLink>
            <Link href={`/${role}/${routeName}/details/${id}`}>
              <Button style={{ margin: "2px" }} type="default">
                View User Info
              </Button>
            </Link>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default EditUser;
