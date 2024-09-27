// src/components/Footer.tsx
import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };
  return (
    <>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row gap-4 text-left">
            {footerSections.map((section, index) => (
              <div
                key={index}
                className="basis-full md:basis-1/4 border-b border-gray-600 py-4 md:border-none"
              >
                {section.title === "Follow Us" ? (
                  <>
                    <h3 className="font-semibold cursor-pointer flex items-center justify-between md:justify-start">
                      {section.title}
                    </h3>
                    <div className="flex space-x-3 justify-start mt-2 ml-3">
                      {section.links.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="text-gray-400 hover:text-gray-200 text-2xl"
                        >
                          <i className={link.icon}></i>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3
                      className="font-semibold cursor-pointer flex items-center justify-between md:justify-start"
                      onClick={() => toggleMenu(index)}
                    >
                      {section.title}
                      <div className="block md:hidden">
                        <i
                          className={`fas fa-chevron-${
                            openMenu === index ? "up" : "down"
                          }`}
                        ></i>
                      </div>
                    </h3>
                    {section.links.map((link, i) => (
                      <div
                        key={i}
                        className={`${
                          openMenu === index ? "block" : "hidden"
                        } md:block`}
                      >
                        <Link
                          key={i}
                          href={link.href}
                          className="ml-3 text-gray-400 block hover:text-gray-200 mt-2"
                        >
                          {link.name}
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="mt-8">
              {" "}
              &copy; {new Date().getFullYear()} Dubai Joy Ride . All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

const footerSections = [
  {
    title: "Follow Us",
    links: [
      {
        name: "github",
        href: "#",
        icon: "fab fa-github",
      },
      {
        name: "LinkedIn",
        href: "#",
        icon: "fab fa-linkedin",
      },
    ],
  },
  {
    title: "Dubai Joy Ride",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

export default Footer;
