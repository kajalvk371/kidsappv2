import Link from "next/link";
import React from "react";

export default function GameCardMaths() {
  return (
    <Link href="/maths" className="hover:rotate-1">
      <div className="relative h-72 w-72 bg-green-300 overflow-hidden rounded-lg shadow-lg">
        {/* Background Math Symbols */}
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <div className="relative text-[12rem] font-extrabold text-green-100 opacity-30">
            1
          </div>
          <div className="relative text-[12rem] font-extrabold text-green-100 opacity-30 -rotate-[10deg]">
            +
          </div>
          <div className="relative text-[12rem] font-extrabold text-green-100 opacity-30 rotate-[15deg]">
            =
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="absolute z-10 inset-0 flex justify-center items-center">
          <div className="relative text-6xl font-bold text-white text-center backdrop-blur-sm">
            <span className="">Maths</span> Game
          </div>
        </div>
      </div>
    </Link>
  );
}
