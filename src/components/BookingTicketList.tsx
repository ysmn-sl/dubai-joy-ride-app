import React, { useState, useRef } from "react";
import { Ticket } from "@/types/themPark";
import { useRouter } from "next/router";

interface Props {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket) => void;
}

const BookingTicketList: React.FC<Props> = ({
  tickets,
  selectedTicket,
  setSelectedTicket,
}) => {
  const [] = useState<Ticket | null>(null);
  // Handle selecting a ticket
  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div>
      <div className="flex flex-row space-x-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={` rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative
              ${
                selectedTicket?.id === ticket.id
                  ? "border-2 border-blue-500"
                  : ""
              }
            `}
          >
            <div className="p-4 flex flex-col flex-1 bg-white border-b">
              <h2 className="text-lg font-bold mb-2 text-gray-700 line-clamp-1">
                {ticket.type}
              </h2>
              <p className="text-gray-600  font-semibold  mb-4">
                {ticket.currency} {ticket.price}
              </p>
              <button
                onClick={() => handleSelectTicket(ticket)}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              >
                {selectedTicket?.id === ticket.id ? "Selected" : "Select"}
              </button>
            </div>
            <div className="px-4 py-2 flex-grow">
              <div className="min-h-[80px]">
                {ticket.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-600 mb-1 text-sm font-extralight"
                  >
                    <p>- {benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTicketList;
