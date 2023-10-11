"use client";
import errorImage from "@/assets/error_image.png";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div>
      <Image
        src={errorImage}
        width={700}
        style={{
          objectFit: "contain",
          width: "100%",
        }}
        alt="Something went wrong"
      />
    </div>
  );
};

export default ErrorPage;
