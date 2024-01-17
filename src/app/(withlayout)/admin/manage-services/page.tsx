import ManageService from "@/components/ManageService/ManageService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Services - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageServicePage = () => {
  return (
    <div>
      <ManageService />
    </div>
  );
};

export default ManageServicePage;
