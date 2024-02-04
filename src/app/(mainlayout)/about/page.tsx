"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useAllAboutUsQuery } from "@/redux/api/content/aboutUsApi";

const AboutUsPage = () => {
  const { data, isLoading } = useAllAboutUsQuery(undefined);

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
                <p style={{ lineHeight: "28px", fontSize: "16px" }}>
                  {" "}
                  {about?.description}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
