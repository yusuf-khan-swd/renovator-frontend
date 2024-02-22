import Booking from "@/components/Booking/Booking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const BookingPage = () => {
  return (
    <div>
      <Booking />
    </div>
  );
};

export default BookingPage;
