import EditReview from "@/components/ManageReview/EditReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditReviewPage = () => {
  return (
    <div>
      <EditReview />
    </div>
  );
};

export default EditReviewPage;
