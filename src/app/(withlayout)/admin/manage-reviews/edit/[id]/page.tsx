import EditReview from "@/components/ManageReview/EditReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Review - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditReviewPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditReview id={id} />
    </div>
  );
};

export default EditReviewPage;
