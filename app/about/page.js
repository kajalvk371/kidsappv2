import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-600 text-center">
        About Our Fun Learning App!
      </h1>
      <div className="bg-white border rounded-lg rounded-lg p-6 sm:p-8 max-w-lg sm:max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">
          Welcome to the Learning Adventure! 🎉
        </h2>
        <p className="text-base sm:text-lg mb-4">
          We believe learning should be fun and exciting for kids, so we created
          this app to make education an adventure! Whether you&apos;re
          practicing your ABCs, brushing up on your math skills, or testing your
          general knowledge, there&apos;s something here for everyone!
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-4">
          ABC Game 📚
        </h3>
        <p className="text-base sm:text-lg mb-4">
          In the <strong>ABC Game</strong>, you&apos;ll journey through the
          alphabet and match each letter with a fun emoji! Think you can spot
          the right one? Test your knowledge and see if you&apos;re a master of
          letters and symbols. 🎨
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">
          Country Flag Game 🏳️🏴
        </h3>
        <p className="text-base sm:text-lg mb-4">
          Love Geography? The <strong>Country flag Game</strong> is perfect for
          you! With random country flags, you can put your knowlegde to test.
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-4">
          Maths Game ➕✖️➗
        </h3>

        <p className="text-base sm:text-lg mb-4">
          Love solving problems? The <strong>Maths Game</strong> is perfect for
          you! With random addition, subtraction, multiplication, and division
          challenges, you&apos;ll become a math whiz in no time! Sharpen your
          skills and have fun cracking those numbers! 💡
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">
          Quiz Game ❓
        </h3>
        <p className="text-base sm:text-lg mb-4">
          The <strong>Quiz Game</strong> is packed with exciting trivia
          questions. From capital cities to animal facts, you&apos;ll learn
          something new with each question! Are you ready to test your brain and
          score some points? Let&apos;s find out! 🏆
        </p>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 text-pink-600">
          Why We Built This App
        </h2>
        <p className="text-base sm:text-lg mb-4">
          We built this app because we believe learning doesn’t have to be
          boring. Our goal is to make education enjoyable by combining learning
          with fun games that encourage curiosity, creativity, and critical
          thinking.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold text-teal-600 mb-4">
          Play, Learn, and Grow! 🌟
        </h3>
        <p className="text-base sm:text-lg mb-4">
          With each game, you’ll be growing your brainpower while having a
          blast! So dive in, play around, and explore all the cool challenges
          we’ve created just for you. Let’s make learning fun together!
        </p>

        <Link
          href={"/"}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 sm:px-6 rounded-lg mt-4 inline-block"
        >
          Start Playing Now!
        </Link>
      </div>
    </div>
  );
}
