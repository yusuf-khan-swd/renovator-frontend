import ManageFaq from "@/components/ManageContent/ManageFaq/ManageFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage FAQs - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageFaqPage = () => {
  return (
    <div>
      <ManageFaq />
    </div>
  );
};

export default ManageFaqPage;
