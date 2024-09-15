import { useEffect, useRef, useState } from "react";
import BookingTicketDateSelector from "@/components/BookingTicketDateSelector";
import BookingTicketList from "@/components/BookingTicketList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Ticket } from "@/types/themPark";
import { useRouter } from "next/router";
import { DateInfo } from "@/types/dateInfo";
import { getAllThemeParkTicketById } from "@/lib/themParkService";
import { error } from "console";

const BookPage: React.FC = () => {
  const getTodayDateInfo = (): DateInfo => {
    const today = new Date();
    return {
      day: today.toLocaleDateString("en-US", { weekday: "short" }), // Short weekday format
      date: today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  };
  const [tickets, setTickes] = useState<Ticket[] | null>();
  const [selectedDate, setSelectedDate] = useState<DateInfo>(getTodayDateInfo); // State to hold selected date
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // State to hold selected ticket
  const router = useRouter();
  const AddToCartRef = useRef<HTMLDivElement | null>(null);
  const { id } = router.query;
  const { product } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await getAllThemeParkTicketById(
            parseInt(id as string)
          );
          if (response.status === 200) {
            setTickes(response.data);
          }
        } catch (error: any) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (selectedTicket && AddToCartRef.current) {
      AddToCartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Function to handle adding the ticket to the cart
  const handleAddToCart = () => {
    if (selectedTicket && selectedDate) {
      router.push({
        pathname: "/cart",
      });
    } else {
      alert("Please select both a ticket and a date.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-8 pb-16 mt-14">
        {/* Date Selection Section */}
        <div className="mb-6">
          <div className="text-xl font-semibold mb-2">Select a date</div>
          {/* Pass setSelectedDate to BookingTicketDateSelector */}
          <BookingTicketDateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        <div className="text-xl font-semibold mb-2">Select your ticket</div>
        {/* Pass setSelectedTicket to BookingTicketList */}
        {tickets && (
          <BookingTicketList
            tickets={tickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
          />
        )}

        {selectedTicket && selectedDate && (
          <div
            ref={AddToCartRef}
            className="mt-4 bg-gray-100 p-4 shadow-lg flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold ">{product}</p>
              <p className="text-sm ">Selected Ticket: {selectedTicket.type}</p>
              <p className="text-xs">{selectedDate.date}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-800 text-white px-4 py-2 rounded transition"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookPage;
