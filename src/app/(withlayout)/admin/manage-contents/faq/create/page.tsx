import CreateFaqPage from "@/components/ManageContent/ManageFaq/CreateFaqPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateFaq = () => {
  return (
    <div>
      <CreateFaqPage />
    </div>
  );
};

export default CreateFaq;
