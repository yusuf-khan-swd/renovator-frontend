import Home from "@/components/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Renovator",
  description: "A Home Renovation Service Provider",
};

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
