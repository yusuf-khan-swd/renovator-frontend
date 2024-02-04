"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useGetAllAboutUsQuery } from "@/redux/api/content/aboutUsApi";

const AboutUs = () => {
  const { data, isLoading } = useGetAllAboutUsQuery(undefined);

  console.log(data);

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <div>
          {data?.map(
            (about: { id: string; title: string; description: string }) => (
              <div key={about?.id} style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>
                  {about?.title}
                </h3>
                <div style={{ lineHeight: "28px", fontSize: "16px" }}>
                  {" "}
                  {about?.description}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
