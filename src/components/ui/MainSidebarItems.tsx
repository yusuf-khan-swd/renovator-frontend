import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MainSidebarItems = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.refresh();
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href="/profile">
          <Button type="link">Profile</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  const { role } = getUserInfo() as any;

  return (
    <div>
      {role ? (
        <Dropdown menu={{ items }}>
          <Space wrap size={16}>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      ) : (
        <div>
          <Link href="signup">
            <Button style={{ marginRight: "5px" }}>Signup</Button>
          </Link>
          <Link href="/login">
            <Button type="primary">login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainSidebarItems;
