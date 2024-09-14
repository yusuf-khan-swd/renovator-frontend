import BookingPage from "@/components/Booking/BookingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking - Renovator",
  description: "A Home Renovation Service Provider",
};

const Booking = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  return <BookingPage id={id} />;
};

export default Booking;
