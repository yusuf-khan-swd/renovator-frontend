import ManageServicePage from "@/components/ManageService/ManageServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageService = () => {
  return <ManageServicePage />;
};

export default ManageService;
