import ViewReviewPage from "@/components/ManageReview/ViewReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const ViewReview = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <ViewReviewPage id={id} />
    </div>
  );
};

export default ViewReview;
