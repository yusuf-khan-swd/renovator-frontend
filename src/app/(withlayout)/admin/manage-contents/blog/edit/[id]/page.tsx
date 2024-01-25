import EditBlog from "@/components/ManageContent/ManageBlog/EditBlog";

const EditBlogPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditBlog id={id} />
    </div>
  );
};

export default EditBlogPage;
