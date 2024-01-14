import HomePageCategories from "@/components/Category/HomePageCategories";
import OngoingService from "@/components/Service/OngoingService";
import UpcomingService from "@/components/Service/UpcomingService";
import Banner from "@/components/ui/Banner";
import Feedback from "@/components/ui/Feedback";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <HomePageCategories />

      <div>
        <OngoingService />
        <UpcomingService />
      </div>
      <Feedback />
    </div>
  );
};

export default HomePage;
