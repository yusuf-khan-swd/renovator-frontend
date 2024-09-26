import EditServicePage from "@/components/ManageService/EditServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditService = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <EditServicePage id={id} />;
};

export default EditService;
