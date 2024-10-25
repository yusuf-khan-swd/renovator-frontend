import ManageFaqPage from "@/components/ManageContent/ManageFaq/ManageFaqPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage FAQs - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageFaq = () => {
  return <ManageFaqPage />;
};

export default ManageFaq;
