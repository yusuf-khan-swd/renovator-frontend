import Home from "@/components/Home/Home";
import CallOut from "@/components/ui/CallOut";
import FooterUI from "@/components/ui/FooterUI";
import MainNavbar from "@/components/ui/MainNavbar";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home - Renovator",
  description: "A Home Renovation Service Provider",
};

const HomePage = () => {
  return (
    <div style={{ maxWidth: "1580px", margin: "0 auto" }}>
      <MainNavbar />
      <div className={styles["main-layout"]}>
        <Home />
      </div>
      <CallOut />
      <FooterUI />
    </div>
  );
};

export default HomePage;
