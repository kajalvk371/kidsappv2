import Link from "next/link";
import React from "react";

export default function GameCardQuiz() {
  return (
    <Link href={"/quiz"} className="hover:rotate-1">
      <div className="relative h-72 w-72 bg-yellow-300 overflow-hidden rounded-lg shadow-lg">
        {/* Background Quiz Symbols */}
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <div className="relative text-[12rem] font-extrabold text-yellow-100 opacity-30">
            ?
          </div>
          <div className="relative text-[12rem] font-extrabold text-yellow-100 opacity-30 -rotate-[10deg]">
            !
          </div>
          <div className="relative text-[12rem] font-extrabold text-yellow-100 opacity-30 rotate-[15deg]">
            ?
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="absolute z-10 inset-0 flex justify-center items-center">
          <div className="relative text-6xl font-bold text-white text-center backdrop-blur-sm">
            <span className="">Quiz</span> Game
          </div>
        </div>
      </div>
    </Link>
  );
}
