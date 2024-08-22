import EditBookingPage from "@/components/ManageBooking/EditBookingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditBooking = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditBookingPage id={id} />
    </div>
  );
};

export default EditBooking;
