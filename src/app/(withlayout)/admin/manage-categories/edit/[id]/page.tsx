import EditCategory from "@/components/ManageCategory/EditCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Categories - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditCategoryPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditCategory id={id} />
    </div>
  );
};

export default EditCategoryPage;
