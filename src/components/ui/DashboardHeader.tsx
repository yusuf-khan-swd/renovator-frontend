import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./DashboardHeader.css";
const { Header: AntHeader } = Layout;

const DashboardHeader = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const { role } = getUserInfo() as any;

  const websiteName = "Renovator";

  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Row justify="center" align="middle">
          <p>Hello</p>
          <Link href="/">
            <Button
              type="link"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <span className="website-name">{websiteName.toUpperCase()}</span>
            </Button>
          </Link>
        </Row>
        <Row justify="center" align="middle">
          <p style={{ margin: "2px" }}>{role}</p>
          <Dropdown menu={{ items }}>
            <a>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </Row>
      </Row>
    </AntHeader>
  );
};

export default DashboardHeader;
