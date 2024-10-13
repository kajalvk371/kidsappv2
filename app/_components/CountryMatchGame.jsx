"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Confetti from "react-confetti"; // Import Confetti

// Flag and country dictionary
const countryDictionary = {
  "🇺🇸": "United States",
  "🇨🇦": "Canada",
  "🇬🇧": "United Kingdom",
  "🇦🇺": "Australia",
  "🇩🇪": "Germany",
  "🇫🇷": "France",
  "🇯🇵": "Japan",
  "🇧🇷": "Brazil",
  "🇮🇹": "Italy",
  "🇮🇳": "India",
  // Add more countries and their flags here
};

const countries = Object.values(countryDictionary);

export default function CountryMatchGame() {
  const [currentFlag, setCurrentFlag] = useState("🇺🇸");
  const [currentCountry, setCurrentCountry] = useState("United States");
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti] = useState(false); // State for confetti
  const [options, setOptions] = useState([]);

  const generateNewFlag = () => {
    const randomFlag =
      Object.keys(countryDictionary)[
        Math.floor(Math.random() * Object.keys(countryDictionary).length)
      ];
    setCurrentFlag(randomFlag);
    setCurrentCountry(countryDictionary[randomFlag]);
    setMessage("");
    setButtonDisabled(false);
    generateOptions(randomFlag);
  };

  const generateOptions = (correctFlag) => {
    const shuffledCountries = countries.sort(() => Math.random() - 0.5);
    const correctCountry = countryDictionary[correctFlag];
    const randomOptions = [correctCountry];

    while (randomOptions.length < 4) {
      const randomCountry =
        shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)];
      if (!randomOptions.includes(randomCountry)) {
        randomOptions.push(randomCountry);
      }
    }
    setOptions(randomOptions.sort(() => Math.random() - 0.5)); // Shuffle options
  };

  const checkAnswer = (selectedCountry) => {
    if (gameOver || buttonDisabled) return;

    setButtonDisabled(true);
    if (selectedCountry === countryDictionary[currentFlag]) {
      setMessage("Correct! 🎉");
      setPoints((prevPoints) => prevPoints + 1);
    } else {
      setMessage(
        `Oops! The correct country for ${currentFlag} is ${countryDictionary[currentFlag]}.`
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
      setTimeout(generateNewFlag, 1000);
    }
  };

  const resetGame = () => {
    setLives(3);
    setPoints(0);
    setGameOver(false);
    setConfetti(false); // Reset confetti state
    generateNewFlag();
  };

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
    generateNewFlag();
  }, []);

  return (
    <div className="max-h-screen relative">
      {confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="flex items-center flex-col my-2">
        <h1 className="text-3xl font-bold mb-4 text-green-600 text-center">
          Country Flag Match Game
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
        >
          How to Play
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
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
          exit={{ opacity: 0 }} // Animation for flag transition
          transition={{ duration: 0.5 }} // Transition duration
        >
          <p className="text-9xl font-bold p-20">{currentFlag}</p>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <p className="mt-4 text-lg">{message}</p>

          {!gameOver && (
            <div className="flex flex-col space-y-4">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => checkAnswer(option)}
                  className="bg-blue-500 border ring-blue-600 text-white hover:bg-blue-600 py-2 px-4 rounded"
                  disabled={buttonDisabled}
                >
                  {option}
                </button>
              ))}
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
                You will see a country flag. Select the correct country name
                from the options provided. Try to get the highest score before
                running out of lives!
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
