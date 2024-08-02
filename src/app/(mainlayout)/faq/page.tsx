import FAQPage from "@/components/FAQ/FAQPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const FAQ = () => {
  return (
    <div>
      <FAQPage />
    </div>
  );
};

export default FAQ;
