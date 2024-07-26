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
      ) : !data || data?.length === 0 ? (
        <h3 style={{ margin: "2px", textAlign: "center" }}>
          No Content Available
        </h3>
      ) : (
        <div>
          <AboutUsContent data={data} />
        </div>
      )}
    </div>
  );
};

export default AboutUs;
