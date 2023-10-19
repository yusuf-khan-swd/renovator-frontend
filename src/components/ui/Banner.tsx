import bannerImage from "@/assets/banner.png";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div style={{ display: "flex" }}>
      <Image src={bannerImage} alt="banner Image" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
    </div>
  );
};

export default Banner;
