import AboutUs from "@/components/AboutUs/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Renovator",
  description: "A Home Renovation Service Provider",
};

const AboutUsPage = () => {
  return (
    <div>
      <AboutUs />
    </div>
  );
};

export default AboutUsPage;
