import FAQPage from "@/components/FAQ/FAQPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const FAQ = () => {
  return <FAQPage />;
};

export default FAQ;
