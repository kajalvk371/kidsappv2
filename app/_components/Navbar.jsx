"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated based on local storage
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    // Clear the authentication status from local storage
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false); // Update state
  };

  return (
    <div className="bg-pink-600 text-pink-50 sticky top-0 z-50">
      <ul className="flex py-6 px-8 gap-4 font-medium">
        <Link href={"/"}>
          <li className="hover:text-pink-200 cursor-pointer">Home</li>
        </Link>
        <Link href={"/about"}>
          <li className="hover:text-pink-200 cursor-pointer">About</li>
        </Link>
        {isAuthenticated ? (
          <li
            onClick={handleLogout}
            className="hover:text-pink-200 cursor-pointer"
          >
            Logout
          </li>
        ) : (
          <Link href={"/login"}>
            <li className="hover:text-pink-200 cursor-pointer">Login</li>
          </Link>
        )}
      </ul>
    </div>
  );
}
