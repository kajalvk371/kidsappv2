// app/_components/GameCardCountryFlag.js
import Link from "next/link";
import React from "react";

export default function GameCardCountryFlag() {
  return (
    <Link href="/country-flag-match" className="hover:rotate-1">
      <div className="relative h-72 w-72 bg-blue-300 overflow-hidden rounded-lg shadow-lg">
        {/* Background Flag Symbols */}
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <div className="relative text-[12rem] font-extrabold text-blue-100 opacity-30">
            🇺🇸
          </div>
          <div className="relative text-[12rem] font-extrabold text-blue-100 opacity-30 -rotate-[10deg]">
            🇬🇧
          </div>
          <div className="relative text-[12rem] font-extrabold text-blue-100 opacity-30 rotate-[15deg]">
            🇫🇷
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="absolute z-10 inset-0 flex justify-center items-center">
          <div className="relative text-6xl font-bold text-white text-center backdrop-blur-sm">
            Country <br /> Flag Match
          </div>
        </div>
      </div>
    </Link>
  );
}
