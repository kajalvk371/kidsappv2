"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import for app router

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Use this to navigate to other routes

  // Handle Signup
  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setMessage("User already exists. Please log in.");
      return;
    }

    // Save new user
    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setMessage("Signup successful! Please log in.");
    setIsLogin(true); // Switch to login after signup
  };

  // Handle Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (existingUser) {
      localStorage.setItem("isAuthenticated", "true"); // Set login status (use string)
      setMessage("Login successful!");
      router.push("/"); // Redirect to protected route
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Form Message */}
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        {/* Action Button */}
        {isLogin ? (
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleSignup}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Signup
          </button>
        )}

        {/* Toggle Login/Signup */}
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-500 cursor-pointer"
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
