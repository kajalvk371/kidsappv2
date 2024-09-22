"use client";
import React, { useState, useEffect } from "react";

export default function QuizGame() {
  const questions = [
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
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

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
    }
  };

  useEffect(() => {
    setMessage("");
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
        Kids Quiz Game
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl flex flex-col items-center space-y-4">
        {/* Question */}
        <p className="text-lg md:text-2xl mb-4 text-center">
          <span className="font-bold">Question:</span>{" "}
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg transition duration-200 ease-in-out transform ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
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
      </div>
    </div>
  );
}
