"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function Maths() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState(""); // Message to show if the answer is correct or wrong
  const [showModal, setShowModal] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [inputError, setInputError] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [changeTries, setChangeTries] = useState(0);
  const [difficulty, setDifficulty] = useState("easy"); // State for difficulty level
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  // Load best score from local storage on mount
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
  }, []);

  // Save the best score to local storage whenever it updates
  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem("bestScore", bestScore);
    }
  }, [bestScore]);

  // Function to generate random math problems
  const generateProblem = () => {
    const operators = ["+", "-", "*", "/"];
    const maxNumber =
      difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50; // Adjust max number based on difficulty
    setNum1(Math.floor(Math.random() * maxNumber) + 1);
    setNum2(Math.floor(Math.random() * maxNumber) + 1);
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
    setAnswer("");
    setMessage(""); // Clear the message when generating a new problem
    setInputError("");
    setButtonClicked(false);
  };

  // Function to reset the game
  const resetGame = () => {
    setLives(3);
    setCurrentScore(0);
    setGameOver(false);
    setChangeTries(0);
    generateProblem();
  };

  // Function to check the answer
  const checkAnswer = () => {
    if (isNaN(answer) || answer.trim() === "") {
      setInputError("Please enter a valid number.");
      return;
    } else if (!/^-?\d+(\.\d+)?$/.test(answer)) {
      setInputError("Please enter a whole or decimal number.");
      return;
    }

    let correctAnswer;
    switch (operator) {
      case "+":
        correctAnswer = num1 + num2;
        break;
      case "-":
        correctAnswer = num1 - num2;
        break;
      case "*":
        correctAnswer = num1 * num2;
        break;
      case "/":
        correctAnswer = (num1 / num2).toFixed(2);
        break;
      default:
        return; // No valid operator
    }

    if (parseFloat(answer) === parseFloat(correctAnswer)) {
      setMessage("Correct! 🎉");
      setCurrentScore((prevScore) => prevScore + 1);
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
    } else {
      setLives((prevLives) => {
        if (prevLives === 1) {
          setGameOver(true);
          setMessage(`Game Over! The correct answer was ${correctAnswer}.`);
          return 0;
        }
        setMessage(`Oops! The correct answer was ${correctAnswer}.`);
        return prevLives - 1;
      });
    }

    setButtonClicked(true);
    setTimeout(() => {
      if (lives > 0) {
        generateProblem();
      }
    }, 2000);
  };

  // Generate a new problem on first load
  useEffect(() => {
    if (gameStarted) {
      generateProblem();
    }
  }, [gameStarted]);

  // Function to change the question
  const handleChangeQuestion = () => {
    if (changeTries < 3) {
      generateProblem();
      setChangeTries((prevTries) => prevTries + 1);
    }
  };

  // Function to start the game
  const startGame = () => {
    setGameStarted(true);
    generateProblem();
  };

  // Function to toggle the How to Play modal
  const toggleHowToPlay = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="max-h-screen flex items-center flex-col p-8">
      {gameOver && <Confetti />}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
        Maths Game
      </h1>

      {/* Difficulty Selector */}
      {!gameStarted && (
        <div className="mb-4 flex flex-col md:flex-row items-center">
          <label htmlFor="difficulty" className="mr-2">
            Select Difficulty:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 rounded mb-2 md:mb-0"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button
            onClick={startGame}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Start Game
          </button>
          <button
            onClick={toggleHowToPlay}
            className="ml-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            How to Play
          </button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="flex font-bold items-center justify-center gap-3 border-b text-sm sm:text-lg">
            <p className="mb-4">❤️‍🩹 Lives: {lives}</p>
            <p className="mb-4">🔢 Points: {currentScore}</p>
            <p className="mb-4">😁 Best Score: {bestScore}</p>
          </div>
          <div className="bg-white p-6 text-center w-full max-w-lg border rounded-md">
            <p className="text-xl md:text-4xl font-semibold mb-4">
              {num1} {operator} {num2} = ?
            </p>
            <input
              type="text"
              placeholder="Enter the answer of the above question..."
              className={`border p-2 w-full max-w-xs mb-4 text-center ${
                inputError ? "border-red-500" : ""
              }`}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setInputError(""); // Reset input error on change
              }}
            />
            {inputError && <p className="text-red-500">{inputError}</p>}

            {/* Display the message about correctness */}
            {message && <p className="mt-4 text-lg">{message}</p>}

            <div className="flex flex-row justify-around space-x-0 gap-4 sm:text-lg text-sm">
              <button
                onClick={checkAnswer}
                className={`bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full max-w-[120px] ${
                  buttonClicked ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={buttonClicked} // Disable button if clicked
              >
                Submit
              </button>
              <button
                onClick={handleChangeQuestion}
                className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full max-w-[120px] ${
                  changeTries >= 3 ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={changeTries >= 3} // Disable if tries are over
              >
                Change question(
                {changeTries < 3 ? 3 - changeTries : "0"} left)
              </button>
            </div>
            <div className="flex font-bold items-center justify-center gap-3 text-sm sm:text-lg">
              {/* You can add more messages if needed */}
            </div>
          </div>
        </>
      )}

      {/* Modal for How to Play */}
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          onClick={toggleHowToPlay}
        >
          <motion.div
            className="bg-white p-8 rounded shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
            <p className="mb-4">
              Solve the math problems to earn points. You have three lives.
              Answering incorrectly will deduct a life. You can change the
              question three times during the game.
            </p>
            <button
              onClick={toggleHowToPlay}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
