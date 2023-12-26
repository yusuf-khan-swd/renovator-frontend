import { useCategoryQuery } from "@/redux/api/categoryApi";

const CategoryServicesPage = ({ params }: { params: any }) => {
  const id = params?.id;

  const { data, isLoading } = useCategoryQuery(id);

  console.log(data);

  const services = data?.services;

  console.log(services);

  return <div>{id}</div>;
};

export default CategoryServicesPage;
