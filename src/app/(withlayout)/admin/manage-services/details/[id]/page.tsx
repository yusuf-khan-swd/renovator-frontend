import DetailsService from "@/components/ManageService/DetailsService";

const DetailsServicePage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <DetailsService id={id} />
    </div>
  );
};

export default DetailsServicePage;
