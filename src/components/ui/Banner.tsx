import bannerImage from "@/assets/banner.png";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <Row>
      <Col order={2} md={{ span: 12, order: 1 }}>
        <Image src={bannerImage} alt="banner Image" style={{ width: "100%" }} />
      </Col>
      <Col
        order={1}
        md={{ span: 12, order: 2 }}
        style={{
          display: "grid",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Welcome to</h2>
          <h1 style={{ fontSize: "80px", fontWeight: "bold" }}>Renovator</h1>
          <p style={{ padding: "15px 0" }}>
            A modern theme geared towards all repairmen, contractors and
            renovation companies.
          </p>
          <Link href="/service">
            <Button size="large" type="primary">
              Get Started
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default Banner;
