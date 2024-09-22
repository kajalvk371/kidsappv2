"use client";

import React, { useState, useEffect } from "react";

export default function Maths() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Function to generate random math problems
  const generateProblem = () => {
    const operators = ["+", "-", "*", "/"];
    setNum1(Math.floor(Math.random() * 10) + 1); // Random number between 1-10
    setNum2(Math.floor(Math.random() * 10) + 1); // Random number between 1-10
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
    setAnswer(""); // Reset answer
    setMessage(""); // Reset message
  };

  // Function to check the answer
  const checkAnswer = () => {
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
        correctAnswer = (num1 / num2).toFixed(2); // Rounded to 2 decimal places
        break;
    }

    if (parseFloat(answer) === parseFloat(correctAnswer)) {
      setMessage("Correct! 🎉");
    } else {
      setMessage(`Oops! The correct answer was ${correctAnswer}.`);
    }
  };

  // Generate a new problem on first load
  useEffect(() => {
    generateProblem();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
        Maths Game
      </h1>
      <div className="bg-white rounded p-6 text-center w-full max-w-lg shadow-lg">
        <p className="text-xl md:text-4xl font-semibold mb-4">
          {num1} {operator} {num2} = ?
        </p>
        <input
          type="number"
          className="border p-2 w-full max-w-xs mb-4 text-center"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="flex justify-around space-x-4">
          <button
            onClick={checkAnswer}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full max-w-[120px]"
          >
            Submit
          </button>
          <button
            onClick={generateProblem}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full max-w-[120px]"
          >
            New Problem
          </button>
        </div>
        <p className="mt-4 text-lg">{message}</p>
      </div>
    </div>
  );
}
