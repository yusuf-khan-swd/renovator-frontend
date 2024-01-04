"use client";
import errorImage from "@/assets/error_image.png";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error: ", error);
  }, [error]);

  return (
    <div style={{ margin: "20px 4px" }}>
      <div
        style={{
          textAlign: "center",
          display: "grid",
          gap: "6px",
        }}
      >
        <h3 style={{ fontSize: "28px", color: "red" }}>
          Something went wrong!
        </h3>
        <p>
          <Link href="/" style={{ marginRight: "4px" }}>
            <Button>Return to home</Button>
          </Link>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </p>
      </div>
      <div
        style={{
          margin: "8px auto",
          maxWidth: "550px",
          maxHeight: "550px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={errorImage}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          alt="Page Not Found"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
