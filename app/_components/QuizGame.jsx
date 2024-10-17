"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // Import a confetti library

export default function QuizGame() {
  const originalQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is 5 + 7?",
      options: ["10", "12", "15", "11"],
      correctAnswer: "12",
    },
    {
      question: "What color is the sky?",
      options: ["Green", "Blue", "Red", "Yellow"],
      correctAnswer: "Blue",
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      options: ["Elephant", "Tiger", "Lion", "Giraffe"],
      correctAnswer: "Lion",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correctAnswer: "Diamond",
    },
    {
      question: "What is the boiling point of water?",
      options: ["100°C", "90°C", "80°C", "110°C"],
      correctAnswer: "100°C",
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide",
    },
    {
      question: "Which is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
    {
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Pepper", "Onion"],
      correctAnswer: "Avocado",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctAnswer: "Tokyo",
    },
  ];

  // Shuffle questions function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti

  // Shuffle questions on mount
  useEffect(() => {
    setQuestions(shuffleArray([...originalQuestions]));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  // Function to check if the selected answer is correct
  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setMessage("Correct! 🎉");
      setScore((prevScore) => prevScore + 1);
    } else {
      setMessage(
        `Oops! The correct answer is ${currentQuestion.correctAnswer}.`
      );
    }
  };

  // Function to load the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setMessage("");
    } else {
      setMessage(
        `Quiz Complete! You scored ${score} out of ${questions.length}!`
      );
      setShowConfetti(true); // Show confetti on quiz completion
    }
  };

  const playAgain = () => {
    setQuestions(shuffleArray([...originalQuestions])); // Shuffle questions again
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setMessage("");
    setScore(0);
    setShowConfetti(false); // Reset confetti state
  };

  useEffect(() => {
    setMessage("");
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  // Toggle the how to play modal
  const toggleHowToPlay = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
        Kids Quiz Game
      </h1>
      <p className="mb-4  max-w-96 bg-blue-100 p-2 rounded-lg text-blue-900">
        <strong>How to play </strong> : Answer the quiz questions correctly to
        earn points. You have three lives. Each incorrect answer will deduct one
        life. You can move to the next question after answering. Scores will be
        displayed at the end!
      </p>
      <div className="bg-white rounded-lg border p-6 w-full max-w-3xl flex flex-col items-center space-y-4 shadow-lg">
        {/* Question */}
        <p className="text-lg md:text-2xl mb-4 text-center">
          <span className="font-bold">Question:</span>{" "}
          {currentQuestion?.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg border border-gray-300 transition duration-200 ease-in-out transform bg-stone-100 text-stone-900 ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "hover:bg-stone-400 text-stone-950"
              }`}
              onClick={() => checkAnswer(option)}
              disabled={selectedAnswer !== null} // Disable buttons after answering
            >
              {option}
            </button>
          ))}
        </div>

        {/* Message */}
        <p className="mt-4 text-lg text-center">{message}</p>

        {/* Next Question Button */}
        {selectedAnswer && (
          <button
            onClick={nextQuestion}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}

        {/* Play Again Button */}
        {showConfetti && (
          <button
            onClick={playAgain}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
