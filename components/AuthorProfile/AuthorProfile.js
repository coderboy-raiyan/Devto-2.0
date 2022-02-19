/* eslint-disable @next/next/no-img-element */
import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const AuthorProfile = ({ singleBlog }) => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="mx-3 fixed  lg:w-[380px] ">
      <div className="bg-white rounded-lg border py-2 px-4 relative">
        {/* user Info */}
        <div className="flex space-x-4 flex-col justify-start ">
          <div className="bg-gray-900 h-8 w-full absolute top-0 right-0 rounded-t-lg"></div>
          <div className="flex items-end z-10 space-x-2">
            <img
              className="w-12 h-12 rounded-full"
              src={singleBlog?.userImg}
              alt=""
            />
            <h5 className="text-lg font-semibold mt-8">
              {singleBlog?.userName}
            </h5>
          </div>
        </div>
        {/* follow button */}
        <div className="my-4">
          <button className="bg-blue-700 hover:bg-blue-800 py-2 px-4 text-white rounded-lg w-full">
            Follow
          </button>
        </div>
        {/* basic info */}
        <div>
          <p className="text-sm leading-5">
            <span className="text-gray-400 font-semibold">JOINED</span> <br />{" "}
            <Moment className="text-gray-500" format="D MMM YYYY">
              {user?.metadata?.creationTime}
            </Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
