import ManageFeedback from "@/components/ManageFeedback/ManageFeedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Feedbacks - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageFeedbackPage = () => {
  return (
    <div>
      <ManageFeedback />
    </div>
  );
};

export default ManageFeedbackPage;
