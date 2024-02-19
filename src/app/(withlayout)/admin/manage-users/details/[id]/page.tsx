import DetailsUser from "@/components/ManageUser/DetailsUser";

const DetailsUserPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <DetailsUser id={id} />
    </div>
  );
};

export default DetailsUserPage;
