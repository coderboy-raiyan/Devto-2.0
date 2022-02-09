/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsBell } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../reducers/miniProfileSlice";
import MiniProfile from "../MiniProfile/MiniProfile";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state);
  const { user, loading, error } = userData.user;
  const mini = useSelector((state) => state.miniProfile);

  return (
    <div className="border-b-2 border-gray-200 bg-white">
      <nav className="max-w-3xl px-4 py-2 md:mx-auto md:max-w-7xl lg:mx-auto lg:max-w-7xl">
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
                className="w-full rounded border-gray-300 py-[6px] text-black lg:w-[400px] "
                type="text"
                placeholder="Search..."
              />
              <RiSearchLine className="absolute inset-y-2 right-0 w-10 cursor-pointer text-2xl" />
            </div>
          </div>

          {/* right side */}
          <ul className="flex items-center space-x-3">
            {/* if email exists */}
            {user.email ? (
              <>
                <li>
                  <Link href="/createPost" passHref>
                    <button className="rounded-md border border-blue-700 py-2 px-3  text-[15px] font-medium text-blue-700 hover:bg-blue-700 hover:text-white hover:underline">
                      Create Post
                    </button>
                  </Link>
                </li>
                <li className="primary-btn relative cursor-pointer">
                  <BsBell className="text-2xl " />
                  <span className="absolute -inset-y-1 right-1 flex h-6 animate-pulse  items-center justify-center rounded-md bg-red-600 px-1 text-sm font-light text-white">
                    2
                  </span>
                </li>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setIsOpen(!mini.isOpen));
                  }}
                  className="relative rounded-full border-4 border-transparent hover:border-gray-100"
                >
                  <img
                    className="h-8 w-8 cursor-pointer rounded-full "
                    src={user.photoURL}
                    alt=""
                  />
                </li>
                <>{mini.isOpen && <MiniProfile />}</>
              </>
            ) : (
              <>
                <li className="primary-btn">
                  <Link href="/login" passHref>
                    Log in
                  </Link>
                </li>
                <li>
                  <Link href="/register" passHref>
                    <button className="rounded-md border border-blue-700 py-2 px-3  text-[15px] font-medium text-blue-700 hover:bg-blue-700 hover:text-white hover:underline">
                      Create Account
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
