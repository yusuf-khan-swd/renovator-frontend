import ViewReviewPage from "@/components/ManageReview/ViewReviewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const ViewReview = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <ViewReviewPage id={id} />;
};

export default ViewReview;
