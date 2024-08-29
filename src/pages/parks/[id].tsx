// src/pages/parks/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Image from "next/image";
import { Park } from "@/types/park";

const ParkDetailPage: React.FC = () => {
  const [park, setPark] = useState<Park | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch("/data/theme-parks.json");
          if (!response.ok) {
            throw new Error(
              `Network response was not ok:  ${response.statusText}`
            );
          }
          const data = await response.json();
          const findItem = data.find(
            (item: Park) => item.id === parseInt(id as string)
          );
          if (findItem) {
            setPark(findItem);
          } else {
            setError("Park not found");
          }
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {park ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{park.name}</h1>
            {park.images.length > 0 && (
              <Image
                src={park.images[0]}
                alt={park.name}
                width={800} // Specify width
                height={400} // Specify height
                className="w-full h-64 object-cover mb-6"
                priority
              />
            )}
            <p className="text-gray-700 mb-4">{park.description}</p>
            <p className="text-gray-700 mb-4">
              {park.price} {park.currency}
            </p>
            <Button variant="primary" onClick={() => router.push(`/cart`)}>
              Book Tickets
            </Button>
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ParkDetailPage;
