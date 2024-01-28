import EditFeedback from "@/components/ManageFeedback/EditFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Feedbacks - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditFeedbackPage = () => {
  return (
    <div>
      <EditFeedback />
    </div>
  );
};

export default EditFeedbackPage;
