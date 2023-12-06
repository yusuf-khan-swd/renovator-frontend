import bannerImage from "@/assets/banner.png";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

// TODO:: Try using row xl, sm and col span for see responsive working or not

const Banner = () => {
  return (
    <Row
      style={{ border: "1px solid blue" }}
      gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}
    >
      <Col style={{ border: "1px solid orange" }}>
        <Image src={bannerImage} alt="banner Image" style={{ width: "100%" }} />
      </Col>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "1px solid orange",
        }}
      >
        <div
          style={{
            border: "1px solid orange",
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
