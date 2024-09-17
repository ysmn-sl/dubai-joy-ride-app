import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { Ticket } from "@/types/themPark";
import { DateInfo } from "@/types/dateInfo";
import { getAllThemeParkTicketById } from "@/lib/themParkService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingTicketDateSelector from "@/components/BookingTicketDateSelector";
import BookingTicketList from "@/components/BookingTicketList";
import CartItem from "@/types/cartItem";
import { Product } from "@/types/product";
import { getProductById } from "@/lib/productService";

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
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateInfo>(getTodayDateInfo);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const AddToCartRef = useRef<HTMLDivElement | null>(null);
  const { addToCart } = useCart(); // Use addToCart function from CartContext

  useEffect(() => {
    if (id) {
      const fetchTickets = async () => {
        try {
          const response = await getAllThemeParkTicketById(
            parseInt(id as string)
          );
          if (response.status === 200) {
            setTickets(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchProduct = async () => {
        try {
          const response = await getProductById(parseInt(id as string));
          if (response.status === 200) {
            setProduct(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchTickets();
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (selectedTicket && AddToCartRef.current) {
      AddToCartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const handleAddToCart = () => {
    if (selectedTicket && product) {
      const cartItem: CartItem = {
        id: product.id + selectedTicket.id,
        product: product,
        ticket: selectedTicket,
        date: selectedDate,
        quantity: 1,
        totalPrice: selectedTicket.price * 1, // Calculate total price based on ticket price
      };

      addToCart(cartItem); // Add the selected ticket to the cart
      router.push("/cart");
    } else {
      alert("Please select both a ticket and a date.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-8 pb-16 mt-14">
        <div className="mb-6">
          <div className="text-xl font-semibold mb-2">Select a date</div>
          <BookingTicketDateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="text-xl font-semibold mb-2">Select your ticket</div>
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
              <p className="text-lg font-semibold">{product?.name}</p>
              <p className="text-sm">Selected Ticket: {selectedTicket.type}</p>
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
