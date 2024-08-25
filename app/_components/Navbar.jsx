import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="bg-pink-600 text-pink-50 ">
      <ul className="flex py-6 px-8 gap-4 font-medium">
        <Link href={"/"}>
          <li className="hover:text-pink-200">Home</li>
        </Link>
        <Link href={"/about"}>
          <li className="hover:text-pink-200">About</li>
        </Link>
        <Link href={"/login"}>
          <li className="hover:text-pink-200">Login</li>
        </Link>
      </ul>
    </div>
  );
}
