import ViewReview from "@/components/ManageReview/ViewReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const ViewReviewPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <ViewReview id={id} />
    </div>
  );
};

export default ViewReviewPage;
