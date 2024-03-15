"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import CommonBreadCrumb from "@/components/ui/CommonBreadCrumb";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useDeleteUserMutation, useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Card, Col, Row, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormHeading from "../ui/FormHeading";

const DetailsUser = ({ id, pageRoute }: { id: string; pageRoute?: string }) => {
  const { data, isLoading } = useUserQuery(id);
  const [deleteUser] = useDeleteUserMutation();

  const router = useRouter();

  const deleteHandler = async (id: string) => {
    try {
      message.loading("Deleting...");
      const result: any = await deleteUser(id);

      if (result?.data) {
        router.push(`/${role}/${routeName}`);
        message.success("User Successfully Deleted!");
      } else {
        message.error("User Delete Failed!");
      }
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
  const endRoute = "details";

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}/${id}` },
        ]}
      />

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card style={{ margin: "20px 8px" }}>
          <FormHeading title="Details User Information" />
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
                <FormInput name="role" label="User Role" readOnly />
              </Col>
            </Row>

            <Link href={`/${role}/manage-users/edit/${id}`}>
              <Button style={{ margin: "2px" }} type="primary">
                Edit User Info
              </Button>
            </Link>
            <ConfirmModal
              id={id}
              handler={deleteHandler}
              title="Do you want to remove this user?"
              content={
                <div>
                  <p>
                    Name:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.name}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span style={{ fontWeight: "bold" }}>{data?.email}</span>
                  </p>
                </div>
              }
            />
          </Form>
        </Card>
      )}
    </div>
  );
};

export default DetailsUser;
