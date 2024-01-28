import DetailsFeedback from "@/components/ManageFeedback/DetailsFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const FeedbackDetailsPage = () => {
  return (
    <div>
      <DetailsFeedback />
    </div>
  );
};

export default FeedbackDetailsPage;
