import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="text-white h-16 bg-[#5fe07f] flex justify-between px-3 items-center">
        <Link href={"/"}>
          <div className=" text-lg logo font-bold cursor-pointer">LinkTrimer</div>
        </Link>
        <ul className="flex justify-center gap-2 items-center">
          <Link href="/">
            <li className="cursor-pointer">Home</li>
          </Link>
          <Link href="/about">
            <li className="cursor-pointer">About</li>
          </Link>
          <Link href="/shorten">
            <li className="cursor-pointer">Shorten</li>
          </Link>

          <li className="flex justify-center items-center gap-2">
            <Link href="/shorten">
              <button className=" bg-[#b5f5c5] p-3 cursor-pointer font-bold rounded-lg py-1 shadow-lg">
                Try Now
              </button>
            </Link>
            <Link href="/github">
              <button className=" bg-[#b5f5c5] p-3 cursor-pointer font-bold rounded-lg py-1 shadow-lg">
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
