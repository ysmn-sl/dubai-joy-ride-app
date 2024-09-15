// src/pages/parks/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { ThemePark } from "@/types/themPark";
import SocialShareDropdown from "@/components/SocialShareDropdown";
import ProductSlider from "@/components/ProductSlider";
import { getThemeParkById } from "@/lib/themParkService";

const ParkDetailPage: React.FC = () => {
  const [park, setPark] = useState<ThemePark | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await getThemeParkById(parseInt(id.toString()));

          if (response.status === 200) {
            setPark(response.data);
          } else {
            setError("Theme park not found");
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

  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.getElementById("stickyElement");
      if (window.scrollY > 100) {
        stickyElement?.classList.remove("hidden");
      } else {
        stickyElement?.classList.add("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBookNavigate = () => {
    router.push({
      pathname: "/book",
      query: { id: id as string, product: park?.name },
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
      {park && (
        <div className=" mx-auto bg-white px-4  ">
          {/*Product Section */}
          <div className="flex flex-col md:flex-row mt-2 py-8 ">
            {/*Product Images */}
            <div className="flex-none max-w-[623px] mx-auto md:w-1/2 md:sticky md:top-4 md:self-start px-2">
              {park.images && <ProductSlider images={park.images} />}
            </div>
            {/*Product Details */}
            <div className="flex-1  md:mt-0 px-2 md:px-4 ">
              <div className=" flex items-center justify-between">
                <p className="px-4 py-1 rounded-sm bg-sky-100 text-sm">
                  {park.category}
                </p>
                <SocialShareDropdown />
              </div>
              <h1 className="text-3xl mt-2 font-bold text-gray-900">
                {park.name}
              </h1>

              <div className="mt-4">
                <span className="text-2xl  text-gray-900  ">
                  {park.currency} {park.basePrice}
                </span>
              </div>
              <div className="flex mt-4">
                <div className=" flex flex-row bg-gray-100 text-slate-700 font-semibold rounded-lg  items-center px-2 mr-3">
                  <span className="">Quantity:</span>
                  <select className="bg-gray-100 text-slate-700 ">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <button
                  className="bg-blue-800 text-white py-2 px-4 rounded-xl text-lg flex-grow"
                  onClick={handleBookNavigate}
                >
                  Book Ticket
                </button>
              </div>
              {/*Product Description Section */}
              <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <input
                  type="checkbox"
                  id="toggle-description"
                  className="peer hidden"
                />
                <label
                  htmlFor="toggle-description"
                  className="cursor-pointer font-semibold flex items-center text-gray-800"
                >
                  <span>Description</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 peer-checked:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                <div
                  className="mt-4 peer-checked:block hidden"
                  id="product-description"
                >
                  <p className="text-gray-600">{park.description}</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="font-bold text-gray-900">Location</h2>
                <p className="mt-4 text-gray-600">{park.location}</p>
              </div>
            </div>
          </div>

          <div
            id="stickyElement"
            className="hidden flex flex-row shadow-lg rounded-lg sticky bottom-2 bg-slate-100 p-4 items-center mt-8 mb-4"
          >
            <div className="flex-1">
              <h2 className="text-sm md:text-xl  font-bold text-gray-800">
                {park.name}
              </h2>
            </div>
            <div className="flextext-center">
              <span className="text-sm md:text-xl font-bold text-gray-900 block mr-2">
                {park.currency} {park.basePrice}
              </span>
            </div>
            <Button variant="primary" onClick={handleBookNavigate}>
              Book Tickets
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ParkDetailPage;
