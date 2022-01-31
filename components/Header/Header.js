/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBell } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";

const Header = () => {
  return (
    <header className="bg-white shadow-sm shadow-gray-300">
      <nav className="lg:max-w-7xl lg:mx-auto md:max-w-7xl md:mx-auto max-w-3xl px-4 py-2">
        <div className="flex justify-between">
          {/* left side */}
          <div className="flex items-center space-x-3 ">
            {/* logo */}
            <div>
              <Link href="/" passHref>
                <div className="relative h-[40px] w-[50px] cursor-pointer py-2">
                  <Image
                    src="https://i.postimg.cc/4xBRpHZy/resized-logo-UQww2so-Ku-Usja-OGNB38o-1.png"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Link>
            </div>
            {/* search */}
            <div className="relative">
              <input
                className="py-[6px] rounded border-gray-300 lg:w-[400px] w-full text-black "
                type="text"
                placeholder="Search..."
              />
              <RiSearchLine className="absolute right-0 inset-y-2 text-2xl w-10 cursor-pointer" />
            </div>
          </div>

          {/* right side */}
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/" passHref>
                <button className="border-blue-700 border py-2 px-3 rounded-md  font-medium text-blue-700 text-[15px] hover:bg-blue-700 hover:text-white hover:underline">
                  Create Post
                </button>
              </Link>
            </li>
            <li>
              <BsBell className="text-2xl" />
            </li>
            <li>
              <img
                src="https://lh3.googleusercontent.com/ogw/ADea4I5ZvbwSXjWpuc4o-e8C3zhFmZ_zZngI6Up__d7_8Q=s32-c-mo"
                alt=""
                className="rounded-full"
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
