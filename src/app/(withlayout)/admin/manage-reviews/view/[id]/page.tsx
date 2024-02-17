import ViewReview from "@/components/ManageReview/ViewReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Reviews - Renovator",
  description: "A Home Renovation Service Provider",
};

const ViewReviewPage = () => {
  return (
    <div>
      <ViewReview />
    </div>
  );
};

export default ViewReviewPage;
