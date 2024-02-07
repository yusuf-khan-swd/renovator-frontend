import EditCategory from "@/components/ManageCategory/EditCategory";

const EditCategoryPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditCategory id={id} />
    </div>
  );
};

export default EditCategoryPage;
