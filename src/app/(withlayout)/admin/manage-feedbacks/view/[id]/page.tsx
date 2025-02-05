import ViewFeedbackPage from "@/components/ManageFeedback/ViewFeedbackPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedbacks Details - Renovator",
  description: "A Home Renovation Service Provider",
};

const ViewFeedback = ({ params }: any) => {
  const id = params?.id;

  return <ViewFeedbackPage id={id} />;
};

export default ViewFeedback;
