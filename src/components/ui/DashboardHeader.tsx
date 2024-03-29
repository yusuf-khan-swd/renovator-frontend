import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardDrawer from "./DashboardDrawer";
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
      id="ant-header"
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
          <Row id="drawer-and-website-icon" justify="center" align="middle">
            <div style={{ marginRight: "8px" }}>
              <DashboardDrawer />
            </div>
            <div>
              <Link href="/">
                <span className="website-name">{websiteName}</span>
              </Link>
            </div>
          </Row>
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
