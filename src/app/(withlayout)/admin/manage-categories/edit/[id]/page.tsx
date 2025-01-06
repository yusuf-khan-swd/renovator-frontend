import EditCategoryPage from "@/components/ManageCategory/EditCategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditCategory = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <EditCategoryPage id={id} />;
};

export default EditCategory;
