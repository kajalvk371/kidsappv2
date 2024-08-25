import Link from "next/link";
import React from "react";

export default function GameCard() {
  return (
    <Link href={"/abc"} className="hover:rotate-1">
      <div className="relative h-72 w-72 bg-purple-300 overflow-hidden rounded-lg ">
        {/* Background Letters */}
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <div className="relative text-[12rem] font-extrabold text-purple-100 opacity-30">
            A
          </div>
          <div className="relative text-[12rem] font-extrabold text-purple-100 opacity-30 -rotate-[10deg]">
            B
          </div>
          <div className="relative text-[12rem] font-extrabold text-purple-100 opacity-30 rotate-[15deg]">
            C
          </div>
        </div>

        {/* Highlighted Text */}
        <div className="absolute z-10 inset-0 flex justify-center items-center">
          <div className="relative text-6xl font-bold text-white text-center backdrop-blur-sm">
            <span className="">ABC</span> Game
          </div>
        </div>
      </div>
    </Link>
  );
}
