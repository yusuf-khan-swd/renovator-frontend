import EditService from "@/components/ManageService/EditService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditServicePage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditService id={id} />
    </div>
  );
};

export default EditServicePage;
