import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-pink-600 text-pink-50 sticky top-0 z-50">
      <ul className="flex py-6 px-8 gap-4 font-medium">
        <Link href={"/"}>
          <li className="hover:text-pink-200 cursor-pointer">Home</li>
        </Link>
        <Link href={"/about"}>
          <li className="hover:text-pink-200 cursor-pointer">About</li>
        </Link>
        <Link href={"/login"}>
          <li className="hover:text-pink-200 cursor-pointer">Login</li>
        </Link>
      </ul>
    </div>
  );
}
