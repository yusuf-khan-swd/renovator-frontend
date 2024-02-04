"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useGetAllAboutUsQuery } from "@/redux/api/content/aboutUsApi";
import AboutUsContent from "./AboutUsContent";

const AboutUs = () => {
  const { data, isLoading } = useGetAllAboutUsQuery(undefined);

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          <AboutUsContent data={data} />
        </div>
      )}
    </div>
  );
};

export default AboutUs;
