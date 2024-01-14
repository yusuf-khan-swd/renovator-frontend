import bannerImage from "@/assets/banner.png";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <Row justify="center">
      <Col
        order={2}
        md={{ span: 12, order: 1 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={bannerImage}
          alt="banner Image"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </Col>
      <Col
        order={1}
        md={{ span: 12, order: 2 }}
        style={{
          display: "grid",
          alignItems: "center",
          margin: "18px 0",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Welcome to</h2>
          <h1 style={{ fontSize: "70px", fontWeight: "bold" }}>Renovator</h1>
          <p style={{ padding: "15px 0", fontSize: "17px" }}>
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
