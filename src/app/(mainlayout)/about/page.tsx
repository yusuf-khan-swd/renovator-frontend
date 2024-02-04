"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import { useAllAboutUsQuery } from "@/redux/api/content/aboutUsApi";

const AboutUsPage = () => {
  const { data, isLoading } = useAllAboutUsQuery(undefined);

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto", lineHeight: "26px" }}>
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
      <p>
        Welcome to Renovator, where dreams meet reality through the artistry of
        home renovation. Our team of skilled craftsmen is dedicated to
        transforming your living spaces into captivating havens that reflect
        your unique style and preferences. With a commitment to excellence, we
        approach each project with passion, precision, and a keen eye for
        detail.
      </p>
      <p>
        At Renovator, we understand the importance of your home – it&apos;s not
        just a structure; it&apos;s a sanctuary. Our mission is to breathe new
        life into your spaces, creating environments that enhance your lifestyle
        and elevate your well-being. From concept to completion, we work closely
        with you to bring your vision to life, ensuring that every detail aligns
        seamlessly with your taste and needs.
      </p>

      <p>
        With years of experience in the industry, Renovator has earned a
        reputation for delivering top-notch craftsmanship and unmatched customer
        satisfaction. We take pride in our ability to turn renovation challenges
        into creative solutions, delivering projects on time and within budget.
        Your satisfaction is our ultimate goal, and we are committed to making
        your renovation journey with Renovator a seamless and gratifying
        experience.
      </p>
      <p>
        Choose Renovator for a transformation that goes beyond bricks and mortar
        – it&apos;s a journey of creating spaces that truly feel like home.
      </p>
    </div>
  );
};

export default AboutUsPage;
