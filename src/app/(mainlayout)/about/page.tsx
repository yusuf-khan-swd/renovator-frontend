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
                <p> {about?.description}</p>
              </div>
            )
          )}
        </div>
      )}
      <h1 style={{ margin: "20px 0" }}>Welcome to Renovator</h1>
      <p>
        We provide the best experience for home renovation and design,
        connecting homeowners and home professionals with the best tools,
        resources and vendors.
      </p>
      <h2 style={{ margin: "20px 0" }}>Who We Are</h2>
      <p>
        At House Beautiful, we are dedicated to bringing you the best in home
        inspiration and design education. Founded in 1896, we are the oldest
        continually-published shelter magazine in the United States, and we are
        proud to carry on this legacy of great design. Whether you are hiring a
        designer for a complete redecoration or dipping your toes in DIY, you
        will find smart tips and designer-tested ideas across our magazine
        pages, website, and videos. Just looking to daydream? Explore our home
        tours for enviable interiors in every style. Something you do not see
        and want to? Let us know.
      </p>
    </div>
  );
};

export default AboutUsPage;
