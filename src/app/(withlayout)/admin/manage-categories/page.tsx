import ManageCategoryPage from "@/components/ManageCategory/ManageCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageCategory = () => {
  return <ManageCategoryPage />;
};

export default ManageCategory;
