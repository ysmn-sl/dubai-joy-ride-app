// src/components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Theme Park Tickets
        </Link>
        <div className="space-x-4">
          <Link href="/parks">Parks</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
