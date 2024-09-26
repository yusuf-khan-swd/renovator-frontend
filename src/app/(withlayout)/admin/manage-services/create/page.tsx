import CreateServicePage from "@/components/ManageService/CreateServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateService = () => {
  return <CreateServicePage />;
};

export default CreateService;
