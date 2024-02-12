import DetailsService from "@/components/ManageService/DetailsService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const DetailsServicePage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <DetailsService id={id} />
    </div>
  );
};

export default DetailsServicePage;
