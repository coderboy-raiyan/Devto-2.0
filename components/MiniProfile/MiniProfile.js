/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../reducers/miniProfileSlice";

function MiniProfile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userData = useSelector((state) => state.user);
    const { user, loading, error } = userData;

    return (
        <div
            onClick={() => {
                dispatch(setIsOpen(false));
            }}
            className="absolute right-11 top-[51px]  z-40 w-72 rounded-lg border bg-white py-2 px-4 shadow-lg transition-all duration-500"
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
                    <Link href="/createPost">
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
                <li
                    onClick={() => router.push("/signOutConf")}
                    className="primary-btn mt-3 border-t py-3 text-gray-600"
                >
                    <button>Sign out</button>
                </li>
            </ul>
        </div>
    );
}

export default MiniProfile;
