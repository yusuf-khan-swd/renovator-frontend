import ManageCartPage from "@/components/ManageCart/ManageCartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Cart - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageCart = () => {
  return <ManageCartPage />;
};

export default ManageCart;
