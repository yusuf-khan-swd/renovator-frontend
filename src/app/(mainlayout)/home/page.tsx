import HomePage from "@/components/Home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Renovator",
  description: "A Home Renovation Service Provider",
};

const Home = () => {
  return <HomePage />;
};

export default Home;
