import DetailsFeedback from "@/components/ManageFeedback/DetailsFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const FeedbackDetailsPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <DetailsFeedback id={id} />
    </div>
  );
};

export default FeedbackDetailsPage;
