import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../reducers/miniProfileSlice";

const MiniProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user, loading, error } = userData;

  return (
    <div
      onClick={() => dispatch(setIsOpen(false))}
      className="absolute right-11 top-[51px]  shadow-lg bg-white z-40 py-2 px-4 w-72 border rounded-lg transition-all duration-500"
    >
      {/* profile  */}
      <p className="primary-btn border-b py-1">
        <Link href="/">
          <a className="text-[15px] font-semibold text-gray-700 ">
            {user?.displayName}
            <br />
            <span className="text-sm font-light">
              @{user.displayName.split(" ").join("").toLowerCase()}
            </span>
          </a>
        </Link>
      </p>
      <ul className="mt-3">
        <li className="primary-btn text-[15px] text-gray-600">
          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </li>
        <li className="primary-btn text-[15px] text-gray-600">
          <Link href="/">
            <a>Create Post</a>
          </Link>
        </li>
        <li className="primary-btn text-[15px] text-gray-600">
          <Link href="/">
            <a>Reading List</a>
          </Link>
        </li>
        <li className="primary-btn text-[15px] text-gray-600">
          <Link href="/">
            <a>Settings</a>
          </Link>
        </li>
        <li className="primary-btn text-gray-600 border-t py-3 mt-3">
          <button>Sign out</button>
        </li>
      </ul>
    </div>
  );
};

export default MiniProfile;
