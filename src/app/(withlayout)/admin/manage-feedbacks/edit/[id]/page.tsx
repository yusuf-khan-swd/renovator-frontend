import EditFeedbackPage from "@/components/ManageFeedback/EditFeedbackPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Feedbacks - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditFeedback = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditFeedbackPage id={id} />
    </div>
  );
};

export default EditFeedback;
