"use client"
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="text-white h-16 bg-[#5fe07f] flex justify-between px-3 items-center relative">
        <Link href={"/"}>
          <div className=" text-lg logo font-bold cursor-pointer">LinkTrimer</div>
        </Link>
        {/* Hamburger Icon for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Menu Items */}
        <ul
          className={`flex-col md:flex-row flex md:flex justify-center gap-2 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-[#5fe07f] md:bg-transparent z-20 transition-all duration-300 ${menuOpen ? 'flex' : 'hidden'} md:flex`}
        >
          <Link href="/">
            <li className="cursor-pointer py-2 md:py-0 px-4 md:px-0 w-full md:w-auto text-center">Home</li>
          </Link>
          <Link href="/about">
            <li className="cursor-pointer py-2 md:py-0 px-4 md:px-0 w-full md:w-auto text-center">About</li>
          </Link>
          <Link href="/shorten">
            <li className="cursor-pointer py-2 md:py-0 px-4 md:px-0 w-full md:w-auto text-center">Shorten</li>
          </Link>
          <li className="flex flex-col md:flex-row justify-center items-center gap-2 w-full md:w-auto">
            <Link href="/shorten">
              <button className=" bg-[#b5f5c5] p-3 cursor-pointer font-bold rounded-lg py-1 shadow-lg w-full md:w-auto mb-2 md:mb-0">
                Try Now
              </button>
            </Link>
            <Link href="/github">
              <button className=" bg-[#b5f5c5] p-3 cursor-pointer font-bold rounded-lg py-1 shadow-lg w-full md:w-auto">
                Github
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
