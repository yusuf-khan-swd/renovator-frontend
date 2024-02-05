import FAQ from "@/components/FAQ/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const FAQPage = () => {
  return (
    <div>
      <FAQ />
    </div>
  );
};

export default FAQPage;
