const ServiceDetailsPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <h1>Service Details Page of id: {id}</h1>
    </div>
  );
};

export default ServiceDetailsPage;
