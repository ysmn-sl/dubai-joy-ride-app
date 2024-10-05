// src/pages/contact.tsx
import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setErrors({});
    }
  };

  return (
    <div className="leading-normal tracking-normal h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first-name" className="block text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              className={`w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="last-name" className="block text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              className={`w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              className={`w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Enter your message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-400 transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
