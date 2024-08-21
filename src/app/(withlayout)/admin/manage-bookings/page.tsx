import ManageBookingPage from "@/components/ManageBooking/ManageBookingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Bookings - Renovator",
  description: "A Home Renovation Service Provider",
};

const ManageBooking = () => {
  return (
    <div>
      <ManageBookingPage />
    </div>
  );
};

export default ManageBooking;
