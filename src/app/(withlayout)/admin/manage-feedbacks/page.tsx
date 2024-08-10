import ManageFeedbackPage from "@/components/ManageFeedback/ManageFeedbackPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Feedbacks - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageFeedback = () => {
  return (
    <div>
      <ManageFeedbackPage />
    </div>
  );
};

export default ManageFeedback;
