import React, { useRef, useState } from "react";
import Image from "next/image";

interface SliderProps {
  images: string[];
}

const ProductSlider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurentIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextSlide = () => {
    setCurentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const gotoSlide = (index: number) => {
    setCurentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const HandleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div className=" relative">
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={HandleTouchEnd}
      >
        {/*Slides */}
        <div
          className="slides flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image
                src={image}
                alt={`Slide ${index}`}
                width={200}
                height={200}
                className="object-cover w-full  aspect-[4/3] rounded-sm flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
      {/*Thumbnails (visible only on md and above) */}
      <div className="thumbnails mt-2 hidden md:flex justify-center items-center space-x-2 relative">
        <button
          onClick={prevSlide}
          className={`absolute left-0 py-4 px-2 shadow-sm text-gray-900 z-10 ${
            currentIndex === 0 ? "opacity-50" : ""
          } `}
          disabled={currentIndex === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumb ${index}`}
            width={200}
            height={200}
            onClick={() => gotoSlide(index)}
            className={`w-28 h-20 cursor-pointer p-1  ${
              index === currentIndex ? "border border-gray-600" : ""
            }`}
          />
        ))}

        <button
          onClick={nextSlide}
          className={`absolute right-0 py-4 px-2 shadow-sm text-gray-900 z-10 ${
            currentIndex === images.length - 1 ? "opacity-50" : ""
          } `}
          disabled={currentIndex === images.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {/*Dots (visible only on sm) */}
      <div className="dots mt-4 flex md:hidden justify-center space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => gotoSlide(index)}
            className={`dot w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400 "
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
