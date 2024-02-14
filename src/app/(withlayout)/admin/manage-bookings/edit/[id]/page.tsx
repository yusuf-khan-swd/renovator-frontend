import EditBooking from "@/components/ManageBooking/EditBooking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditBookingPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <EditBooking id={id} />
    </div>
  );
};

export default EditBookingPage;
