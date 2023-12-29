import { GithubOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";

const FooterUI = () => {
  const year = new Date().getFullYear();

  const iconStyle = {
    fontSize: "24px",
  };

  return (
    <div>
      <Footer style={{ textAlign: "center" }}>
        Renovator ©{year} Develop by{" "}
        <a href="https://github.com/yusuf-khan-swd" target="_blank">
          Yusuf
        </a>
        <div style={{ margin: "16px 0" }}>
          <a
            href="https://github.com/yusuf-khan-swd/renovator-frontend"
            target="_blank"
          >
            <Button size="large" type="link" style={{ color: "initial" }}>
              <GithubOutlined
                title="Click to view Github Code"
                style={iconStyle}
              />
            </Button>
          </a>
        </div>
      </Footer>
    </div>
  );
};

export default FooterUI;
