import EditFaqPage from "@/components/ManageContent/ManageFaq/EditFaqPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditFaq = ({ params }: any) => {
  const id = params?.id;

  return <EditFaqPage id={id} />;
};

export default EditFaq;
