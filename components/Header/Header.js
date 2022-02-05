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
    <div className="bg-white border-b-2 border-gray-200">
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
          <ul className="flex items-center space-x-3">
            <li>
              <Link href="/" passHref>
                <button className="border-blue-700 border py-2 px-3 rounded-md  font-medium text-blue-700 text-[15px] hover:bg-blue-700 hover:text-white hover:underline">
                  Create Post
                </button>
              </Link>
            </li>
            <li className="primary-btn cursor-pointer relative">
              <BsBell className="text-2xl " />
              <span className="absolute -inset-y-1 right-1 bg-red-600 text-white h-6  px-1 rounded-md font-light text-sm flex justify-center items-center animate-pulse">
                2
              </span>
            </li>
            {/* if email exists */}
            {user.email ? (
              <>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setIsOpen(!mini.isOpen));
                  }}
                  className="relative hover:border-gray-100 border-4 border-transparent rounded-full"
                >
                  <img
                    className="w-8 h-8 cursor-pointer rounded-full "
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
                    <button className="border-blue-700 border py-2 px-3 rounded-md  font-medium text-blue-700 text-[15px] hover:bg-blue-700 hover:text-white hover:underline">
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
