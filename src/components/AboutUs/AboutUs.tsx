"use client";

import { useGetAllAboutUsQuery } from "@/redux/api/content/aboutUsApi";
import CenterLoading from "../Loading/CenterLoading";
import AboutUsContent from "./AboutUsContent";

const AboutUs = () => {
  const { data, isLoading } = useGetAllAboutUsQuery(undefined);

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      {isLoading ? (
        <CenterLoading />
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
