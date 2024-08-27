// src/pages/parks/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const ParkDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const park = {
    id,
    image: "/images/park1.jpg",
    title: "Dubai Theme Park 1",
    description: "Enjoy amazing rides and attractions for all ages.",
    highlights: [
      "Thrilling roller coasters",
      "Family-friendly shows",
      "Delicious dining options",
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{park.title}</h1>
        <img
          src={park.image}
          alt={park.title}
          className="w-full h-64 object-cover mb-6"
        />
        <p className="text-gray-700 mb-4">{park.description}</p>
        <ul className="list-disc ml-6 mb-6">
          {park.highlights.map((highlight, index) => (
            <li key={index} className="mb-2">
              {highlight}
            </li>
          ))}
        </ul>
        <Button variant="primary" onClick={() => router.push(`/cart`)}>
          Book Tickets
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default ParkDetailPage;
