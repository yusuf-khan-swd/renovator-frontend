import EditFeedback from "@/components/ManageFeedback/EditFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Feedbacks - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditFeedbackPage = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <EditFeedback id={id} />
    </div>
  );
};

export default EditFeedbackPage;
