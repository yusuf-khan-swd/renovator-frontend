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

const EditUserPage = ({ params }: any) => {
  const { role } = getUserInfo() as any;
  const routeName = "manage-users";
  const endRoute = "details";

  const id = params?.id;
  const { data, isLoading } = useUserQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const deleteUserHandler = async (id: string) => {
    try {
      message.loading("Deleting...");
      const result: any = await deleteUser(id);

      router.push(`/${role}/${routeName}`);

      if (result?.data) {
        message.success("User Successfully Deleted!");
      } else {
        message.error("User Delete Failed!");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message);
    }
  };

  const defaultValues = {
    id: data?.id,
    name: data?.name || "",
    email: data?.email || "",
    role: data?.role || "",
  };

  return (
    <div>
      <CommonBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: routeName, link: `/${role}/${routeName}` },
          { label: endRoute, link: `/${role}/${routeName}/${endRoute}` },
        ]}
      />

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Card style={{ margin: "20px 8px" }}>
          <h3 style={{ fontSize: "26px" }}>Details User Information</h3>

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
              handler={deleteUserHandler}
              title="Do you want to remove this user?"
              content={`Remove this user id: ${id}`}
            />
          </Form>
        </Card>
      )}
    </div>
  );
};

export default EditUserPage;
