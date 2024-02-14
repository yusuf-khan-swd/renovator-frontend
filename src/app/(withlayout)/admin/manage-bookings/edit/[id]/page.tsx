import EditBooking from "@/components/ManageBooking/EditBooking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const EditBookingPage = () => {
  return (
    <div>
      <EditBooking />
    </div>
  );
};

export default EditBookingPage;
