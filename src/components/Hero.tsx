import { useRouter } from "next/router";
import React, { useState } from "react";

const Hero: React.FC = () => {
  // State for dynamic button text
  const [buttonText, setButtonText] = useState("Book Now");
  const handleMouseEnter = () => setButtonText("Let's Go!");
  const handleMouseLeave = () => setButtonText("Book Now");

  const router = useRouter();

  return (
    <section
      className="relative bg-cover bg-center h-[40vh] lg:h-[50vh] flex items-center justify-center transition-all ease-in-out duration-500 pt-16"
      style={{ backgroundImage: 'url("/images/cover-hero.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>

      <div className="relative z-10 text-center px-4 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4">
          Dubai Joy Ride
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
          Experience the thrill with exclusive access to Dubai’s top theme
          parks. Adventure awaits with fun for all!
        </p>
        <button
          className="bg-blue-900 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:bg-primary-600 transition-all ease-in-out duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            router.push("/parks");
          }}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
