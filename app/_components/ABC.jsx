"use client";
import React, { useState, useEffect } from "react";

export default function ABC() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const emojiDictionary = {
    A: "🍎", // Apple
    B: "🍌", // Banana
    C: "🌽", // Corn
    D: "🐶", // Dog
    E: "🍆", // Eggplant
    F: "🐸", // Frog
    G: "🍇", // Grapes
    H: "🏠", // House
    I: "🍦", // Ice cream
    J: "🤹", // Juggler
    K: "🥝", // Kiwi
    L: "🍋", // Lemon
    M: "🌕", // Moon
    N: "🥜", // Nut
    O: "🍊", // Orange
    P: "🍍", // Pineapple
    Q: "👑", // Queen
    R: "🤖", // Robot
    S: "🐍", // Snake
    T: "🌮", // Taco
    U: "☂️", // Umbrella
    V: "🌋", // Volcano
    W: "🍉", // Watermelon
    X: "❌", // Cross mark
    Y: "🍋", // Lemon (Incorrect Emoji Example)
    Z: "🦓", // Zebra
  };

  const [currentLetter, setCurrentLetter] = useState("A");
  const [currentEmoji, setCurrentEmoji] = useState("🍎");
  const [message, setMessage] = useState("");

  // Function to get a random emoji (correct or incorrect)
  const getRandomEmoji = () => {
    const allEmojis = Object.values(emojiDictionary);
    const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
    return randomEmoji;
  };

  // Function to set a new letter and a random emoji (either correct or incorrect)
  const generateNewLetter = () => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    const correctEmoji = emojiDictionary[randomLetter];

    // Randomly decide whether to show the correct emoji or a random one
    const showCorrectEmoji = Math.random() < 0.5;
    const emojiToShow = showCorrectEmoji ? correctEmoji : getRandomEmoji();

    setCurrentLetter(randomLetter);
    setCurrentEmoji(emojiToShow);
    setMessage("");
  };

  // Function to check if the emoji is correct for the letter
  const checkAnswer = (isTrue) => {
    const correctEmoji = emojiDictionary[currentLetter];
    const isCorrect = currentEmoji === correctEmoji;

    if (isTrue === isCorrect) {
      setMessage("Correct! 🎉");
    } else {
      setMessage(
        `Oops! The correct emoji for ${currentLetter} is ${correctEmoji}.`
      );
    }
  };

  // Generate a new letter on first load
  useEffect(() => {
    generateNewLetter();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-600 text-center">
        ABC Game
      </h1>
      <div className="bg-white rounded p-4 sm:p-6 w-full max-w-xl flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        {/* Left side: Alphabet card */}
        <div className="bg-green-200 w-full md:w-1/2 h-48 sm:h-64 flex items-center justify-center rounded-lg shadow-lg">
          <p className="text-6xl sm:text-7xl font-bold text-green-800">
            {currentLetter}
          </p>
        </div>
        {/* Right side: Emoji and buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <p className="text-5xl sm:text-6xl">{currentEmoji}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => checkAnswer(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              True
            </button>
            <button
              onClick={() => checkAnswer(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              False
            </button>
          </div>
          <p className="mt-4 text-lg">{message}</p>
          <button
            onClick={generateNewLetter}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Next Letter
          </button>
        </div>
      </div>
    </div>
  );
}
