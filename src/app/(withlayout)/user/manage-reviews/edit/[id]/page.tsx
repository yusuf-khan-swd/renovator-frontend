import EditReviewPage from "@/components/ManageReview/EditReviewPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditReview = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <EditReviewPage id={id} />;
};

export default EditReview;
