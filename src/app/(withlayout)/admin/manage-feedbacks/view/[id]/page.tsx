import ViewFeedback from "@/components/ManageFeedback/ViewFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const FeedbackDetailsPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <ViewFeedback id={id} />
    </div>
  );
};

export default FeedbackDetailsPage;
