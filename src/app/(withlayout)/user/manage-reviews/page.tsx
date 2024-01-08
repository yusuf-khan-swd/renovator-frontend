import ManageReview from "@/components/ManageReview/ManageReview";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Reviews - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageReviewPage = () => {
  return (
    <div>
      <ManageReview />
    </div>
  );
};

export default ManageReviewPage;
