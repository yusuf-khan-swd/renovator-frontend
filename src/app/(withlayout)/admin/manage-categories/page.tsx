import ManageCategory from "@/components/ManageCategory/ManageCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageCategoryPage = () => {
  return (
    <div>
      <ManageCategory />
    </div>
  );
};

export default ManageCategoryPage;
