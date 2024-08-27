// src/components/Hero.tsx
import React from "react";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            Dubai Joy Ride
          </h1>
          <p className="mt-4 text-lg text-white">
            Discover the ultimate thrill with DubaiJoyRide. Get exclusive access
            to Dubai’s top theme parks and experience heart-pounding excitement
            and family fun!
          </p>
          <Button variant="primary" className="mt-6">
            Book Your Adventure
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
