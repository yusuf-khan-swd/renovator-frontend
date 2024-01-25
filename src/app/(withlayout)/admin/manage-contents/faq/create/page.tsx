import CreateFaq from "@/components/ManageContent/ManageFaq/CreateFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateFaqPage = () => {
  return (
    <div>
      <CreateFaq />
    </div>
  );
};

export default CreateFaqPage;
