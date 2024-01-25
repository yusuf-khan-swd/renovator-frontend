import EditFaq from "@/components/ManageContent/ManageFaq/EditFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit FAQ - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditFaqPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditFaq id={id} />
    </div>
  );
};

export default EditFaqPage;
