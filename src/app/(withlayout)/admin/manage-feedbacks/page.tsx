import ManageReview from "@/components/ManageReview/ManageReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Reviews - Renovator",
  description: "A Home Renovation Service Provider",
};

// TODO: Create a ManageFeedback component with its feedbacks api slice
// TODO: Update edit and view page with feedbacks api slice
const ManageFeedbackPage = () => {
  return (
    <div>
      <ManageReview />
    </div>
  );
};

export default ManageFeedbackPage;