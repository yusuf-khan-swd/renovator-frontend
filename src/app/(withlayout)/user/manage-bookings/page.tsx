import ManageBooking from "@/components/ManageBooking/ManageBooking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Bookings - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageBookingPage = () => {
  return (
    <div>
      <ManageBooking />
    </div>
  );
};

export default ManageBookingPage;
