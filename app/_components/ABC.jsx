"use client";
import React, { useState } from "react";

export default function ABC() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  // Utility to generate random colors
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const handleClick = (letter, index) => {
    if (letter === alphabet[currentIndex]) {
      setCurrentIndex(currentIndex + 1);
      if (currentIndex + 1 === alphabet.length) {
        setMessage(
          "Well done! You selected all letters in the correct sequence!"
        );
      }
    } else {
      setMessage("Oops! Try again from the beginning.");
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ABCD GAME</h1>
      <p>Select all letters from A - Z in sequence</p>
      <div className="flex flex-wrap justify-center space-x-2 max-w-[560px]">
        {alphabet.map((letter, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-bold text-4xl rounded-lg transform transition duration-300 
              hover:scale-110 active:scale-90 ${
                index < currentIndex ? "text-gray-400 cursor-not-allowed" : ""
              }`}
            style={{ color: index < currentIndex ? "#9ca3af" : randomColor() }}
            onClick={() => handleClick(letter, index)}
            disabled={index < currentIndex}
          >
            {letter}
          </button>
        ))}
      </div>
      {message && <p className="mt-4 text-lg text-gray-800">{message}</p>}
    </div>
  );
}
