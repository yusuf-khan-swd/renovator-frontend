import AboutUsPage from "@/components/AboutUs/AboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Renovator",
  description: "A Home Renovation Service Provider",
};

const AboutUs = () => {
  return (
    <div>
      <AboutUsPage />
    </div>
  );
};

export default AboutUs;
