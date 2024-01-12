import ManageCart from "@/components/ManageCart/ManageCart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Cart - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageCartPage = () => {
  return (
    <div>
      <ManageCart />
    </div>
  );
};

export default ManageCartPage;
