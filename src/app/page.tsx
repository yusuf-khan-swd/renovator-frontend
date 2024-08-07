import HomePage from "@/components/Home/HomePage";
import CallOut from "@/components/ui/CallOut";
import FooterUI from "@/components/ui/FooterUI";
import MainNavbar from "@/components/ui/MainNavbar";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home - Renovator",
  description: "A Home Renovation Service Provider",
};

const Home = () => {
  return (
    <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
      <MainNavbar />
      <div className={styles["main-layout"]}>
        <HomePage />
      </div>
      <CallOut />
      <FooterUI />
    </div>
  );
};

export default Home;
