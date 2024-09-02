import React, { useEffect, useRef, useState } from "react";

const SocialShareDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative " ref={dropdownRef}>
      <button
        className=" text-white bg-blue-900 hover:shadow-sm focus:outline-none py-1 px-2 rounded-xl text-sm "
        onClick={handleDropdownToggle}
      >
        <i className="fas fa-arrow-up-from-bracket mr-1 "></i>
        Share
      </button>
      {isOpen && (
        <div className=" absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="list-none p-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 "
              >
                <i className="fab fa-facebook-f mr-2"></i> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <i className="fab fa-twitter mr-2"></i> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                <i className="fab fa-linkedin-in mr-2"></i> LinkedIn
              </a>
            </li>
            <li>
              <button
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
                onClick={handleCopyClick}
              >
                <i className="fas fa-link mr-2"></i> Copy Link
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SocialShareDropdown;
