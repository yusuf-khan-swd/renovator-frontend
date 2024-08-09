import ManageReviewPage from "@/components/ManageReview/ManageReviewPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Reviews - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageReview = () => {
  return (
    <div>
      <ManageReviewPage />
    </div>
  );
};

export default ManageReview;
