import CreateService from "@/components/ManageService/CreateService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateServicePage = () => {
  return (
    <div>
      <CreateService />
    </div>
  );
};

export default CreateServicePage;
