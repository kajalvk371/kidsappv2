"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase"; // Ensure you have the Supabase client setup
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster
import bcrypt from "bcryptjs"; // Import bcrypt for hashing

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // New state for name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle Signup
  const handleSignup = async () => {
    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the Supabase 'users' table
      const { data, error } = await supabase
        .from("users")
        .insert([{ name, email, password: hashedPassword }]); // Adding 'name' to the insert query

      if (error) {
        toast.error(`Error signing up: ${error.message}`); // Show error message
      } else {
        toast.success("Signup successful! Please log in."); // Show success message
        setIsLogin(true); // Switch to login after signup
      }
    } catch (err) {
      toast.error(`An error occurred: ${err.message}`); // Show error message
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      // Query Supabase to get the user by email
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single(); // Use single to retrieve a single user

      if (error) {
        toast.error(`Error logging in: ${error.message}`); // Show error message
        return;
      }

      if (data) {
        // Verify the password
        const isPasswordMatch = await bcrypt.compare(password, data.password);

        if (isPasswordMatch) {
          localStorage.setItem("isAuthenticated", "true");
          toast.success("Login successful!"); // Show success message
          router.push("/"); // Redirect to protected route
        } else {
          toast.error("Invalid email or password."); // Show error message
        }
      } else {
        toast.error("Invalid email or password."); // Show error message
      }
    } catch (err) {
      toast.error(`An error occurred: ${err.message}`); // Show error message
    }
  };

  return (
    <div className="min-h-96 flex items-center justify-center">
      <Toaster position="top-center" /> {/* Add Toaster for notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>

        {/* Name Input for Signup */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

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
