import EditUser from "@/components/ManageUser/EditUser";

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditUser id={id} />
    </div>
  );
};

export default EditUserPage;
