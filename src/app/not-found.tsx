import notFoundImage from "@/assets/not_found-image.png";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div>
      <Image
        src={notFoundImage}
        width={700}
        style={{
          objectFit: "contain",
          width: "100%",
        }}
        alt="Page Not Found"
      />
    </div>
  );
};

export default NotFoundPage;
