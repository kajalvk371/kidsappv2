"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Confetti from "react-confetti"; // Import Confetti

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
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false); // State for confetti

  const getRandomEmoji = () => {
    const allEmojis = Object.values(emojiDictionary);
    const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
    return randomEmoji;
  };

  const generateNewLetter = () => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    const correctEmoji = emojiDictionary[randomLetter];

    const showCorrectEmoji = Math.random() < 0.5;
    const emojiToShow = showCorrectEmoji ? correctEmoji : getRandomEmoji();

    setCurrentLetter(randomLetter);
    setCurrentEmoji(emojiToShow);
    setMessage("");
    setButtonDisabled(false);
  };

  const checkAnswer = (isTrue) => {
    if (gameOver || buttonDisabled) return;

    const correctEmoji = emojiDictionary[currentLetter];
    const isCorrect = currentEmoji === correctEmoji;

    setButtonDisabled(true);

    if (isTrue === isCorrect) {
      setMessage("Correct! 🎉");
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setMessage(
        `Oops! The correct emoji for ${currentLetter} is ${correctEmoji}.`
      );
      setLives((prevLives) => prevLives - 1);
    }

    if (lives - 1 === 0) {
      setGameOver(true);
      setMessage("Game Over! 💀");
      setConfetti(true); // Trigger confetti effect

      setBestScore((prevBestScore) => {
        const newBestScore = points > prevBestScore ? points : prevBestScore;
        localStorage.setItem("bestScore", newBestScore);
        return newBestScore;
      });
    } else {
      setTimeout(generateNewLetter, 1000);
    }
  };

  const resetGame = () => {
    setLives(3);
    setPoints(0);
    setGameOver(false);
    setConfetti(false); // Reset confetti state
    generateNewLetter();
  };

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
    generateNewLetter();
  }, []);

  return (
    <div className="max-h-screen relative">
      {confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="flex items-center flex-col my-2">
        <h1 className="text-3xl font-bold mb-4 text-green-600 text-center">
          ABC Game
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        >
          How to Play
        </button>
      </div>
      <div className="flex flex-col items-center justify-center items-center">
        <div className="flex font-bold items-center justify-center gap-3 border-b text-sm sm:text-lg">
          <p className="mb-4">❤️‍🩹 Lives: {lives}</p>
          <p className="mb-4">🔢 Points: {points}</p>
          <p className="mb-4">😁 Best Score: {bestScore}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 p-6 sm:flex-row flex-col">
        <motion.div
          className="flex items-center justify-center bg-stone-100 border-2 rounded-lg ring-2 8 w-72 ring-pink-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Animation for letter transition
          transition={{ duration: 0.5 }} // Transition duration
        >
          <p className="text-9xl font-bold p-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {currentLetter}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <motion.p
            className="text-5xl sm:text-6xl"
            key={currentEmoji} // Animate on emoji change
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }} // Transition duration for emoji
          >
            {currentEmoji}
          </motion.p>
          <p className="mt-4 text-lg">{message}</p>

          {!gameOver && (
            <div className="flex space-x-4">
              <button
                onClick={() => checkAnswer(true)}
                className="bg-green-500 border ring-green-600 text-green-50 hover:bg-green-600 py-2 px-4 rounded"
                disabled={buttonDisabled}
              >
                True
              </button>
              <button
                onClick={() => checkAnswer(false)}
                className="bg-red-500 border ring-red-600 text-red-50 hover:bg-red-600 py-2 px-4 rounded"
                disabled={buttonDisabled}
              >
                False
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Animation for game over popup
            transition={{ duration: 0.5 }} // Transition duration for popup
          >
            <div className="bg-white p-8 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Game Over! 💀</h2>
              <p className="mb-4">Your score: {points}</p>
              <p className="mb-4">Best score: {bestScore}</p>
              <button
                onClick={resetGame}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Animation for modal
            transition={{ duration: 0.5 }} // Transition duration for modal
          >
            <div className="bg-white p-8 rounded-lg text-center shadow-lg">
              <h2 className="text-2xl font-bold mb-4">How to Play</h2>
              <p className="mb-4">
                For each letter, you will see an emoji. Press &&quot;True&quot;
                if the emoji corresponds to the letter or &quot;False&quot; if
                it doesn&apos;t. Try to get the highest score before running out
                of lives!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
