"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function Maths() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [gameStarted, setGameStarted] = useState(false);
  const [hasSelectedAnswer, setHasSelectedAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // New state for confetti

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    if (bestScore > 0) {
      localStorage.setItem("bestScore", bestScore);
    }
  }, [bestScore]);

  const generateProblem = () => {
    const operators = ["+", "-", "*", "/"];
    const maxNumber =
      difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50;

    const n1 = Math.floor(Math.random() * maxNumber) + 1;
    const n2 = Math.floor(Math.random() * maxNumber) + 1;
    const op = operators[Math.floor(Math.random() * operators.length)];

    let correctAns;
    switch (op) {
      case "+":
        correctAns = n1 + n2;
        break;
      case "-":
        correctAns = n1 - n2;
        break;
      case "*":
        correctAns = n1 * n2;
        break;
      case "/":
        correctAns = parseFloat((n1 / n2).toFixed(2));
        break;
      default:
        return;
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setCorrectAnswer(correctAns);

    const incorrectAnswers = Array.from({ length: 3 }, () =>
      (Math.random() * maxNumber * 2).toFixed(2)
    );

    const allOptions = [...incorrectAnswers, correctAns].sort(
      () => 0.5 - Math.random()
    );
    setAnswerOptions(allOptions);
    setMessage("");
    setHasSelectedAnswer(false);
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (hasSelectedAnswer) return;

    setHasSelectedAnswer(true);

    if (parseFloat(selectedAnswer) === correctAnswer) {
      setMessage("Correct! 🎉");
      setShowConfetti(true); // Show confetti on correct answer
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

    setTimeout(() => {
      if (lives > 0) {
        setShowConfetti(false); // Hide confetti after 2 seconds
        generateProblem();
      }
    }, 2000);
  };

  useEffect(() => {
    if (gameStarted) {
      generateProblem();
    }
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    generateProblem();
  };

  return (
    <div className="max-h-screen flex items-center flex-col p-8">
      {showConfetti && <Confetti colors={["#ff69b4"]} />} {/* Pink confetti */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
        Maths Game
      </h1>

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
            <div className="grid grid-cols-2 gap-4">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  disabled={hasSelectedAnswer}
                  className={`${
                    hasSelectedAnswer
                      ? "bg-gray-400"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white py-2 px-4 rounded w-full`}
                >
                  {option}
                </button>
              ))}
            </div>

            {message && <p className="mt-4 text-lg">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
}
