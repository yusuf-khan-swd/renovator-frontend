import Booking from "@/components/Booking/Booking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const BookingPage = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return (
    <div>
      <Booking id={id} />
    </div>
  );
};

export default BookingPage;
