// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";

const categories = [
  { id: 1, name: "All Parks", link: "/parks" },
  { id: 2, name: "Theme Park", link: "/" },
  { id: 3, name: "Adventure Park", link: "/" },
  { id: 4, name: "Safari Park", link: "/" },
  { id: 5, name: "Aquarium", link: "/" },
  { id: 6, name: "Desert Safari", link: "/" },
  { id: 7, name: "Snow Park", link: "/" },
  { id: 8, name: "Cruise", link: "/" },
  { id: 9, name: "Skydiving", link: "/" },
  { id: 10, name: "Landmark", link: "/" },
  { id: 11, name: "Water Park", link: "/" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="p-4">
        {/* Logo and Hamburger Button */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold hidden lg:block">
            <Link href="/">Dubai Adventures</Link>
          </div>

          {/* Hamburger Button for small screens */}
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <i className="fa-solid fa-times text-2xl"></i>
            ) : (
              <i className="fa-solid fa-bars text-2xl"></i>
            )}
          </button>
          <div className="text-xl font-bold block lg:hidden">
            <Link href="/">Dubai Adventures</Link>
          </div>

          {/* Cart Link */}
          <div className="flex space-x-6">
            <Link href="/cart">
              <i className="fa fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>

        {/* Responsive Fullscreen Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed inset-0 bg-white z-40 flex flex-col items-center justify-center lg:flex lg:static lg:bg-transparent lg:w-full lg:space-x-4`}
        >
          <button
            onClick={toggleMenu}
            className="lg:hidden absolute top-4 right-4 text-gray-600 focus:outline-none"
          >
            <i className="fa-solid fa-times text-2xl"></i>
          </button>

          <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="text-gray-600 hover:text-blue-500 transition-colors text-2xl lg:text-base"
              >
                <Link href={category.link}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
