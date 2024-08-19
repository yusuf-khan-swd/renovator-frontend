import CreateCategoryPage from "@/components/ManageCategory/CreateCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateCategory = () => {
  return (
    <div>
      <CreateCategoryPage />
    </div>
  );
};

export default CreateCategory;
