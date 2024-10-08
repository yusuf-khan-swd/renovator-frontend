import DetailsServicePage from "@/components/ManageService/DetailsServicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const DetailsService = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <DetailsServicePage id={id} />;
};

export default DetailsService;
