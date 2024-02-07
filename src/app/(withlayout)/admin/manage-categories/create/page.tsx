import CreateCategory from "@/components/ManageCategory/CreateCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const CreateCategoryPage = () => {
  return (
    <div>
      <CreateCategory />
    </div>
  );
};

export default CreateCategoryPage;
