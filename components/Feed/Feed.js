/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcComments, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

function Feed({ blogs }) {
    const router = useRouter();

    return (
        <div>
            {/* feed header */}
            <ul className="flex space-x-7 xl:w-[80%] mx-auto">
                <li className="cursor-pointer rounded py-2 px-3 font-semibold hover:bg-white hover:text-blue-600">
                    Relevant
                </li>
                <li className="cursor-pointer rounded py-2 px-3 hover:bg-white hover:text-blue-600">
                    Latest
                </li>
                <li className="cursor-pointer rounded py-2 px-3 hover:bg-white hover:text-blue-600">
                    Top
                </li>
            </ul>

            {/* feed starts here */}

            <div>
                {/* single feed */}

                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="my-2 cursor-pointer rounded-lg border border-gray-300 bg-white ring-2  ring-transparent hover:border-transparent hover:ring-blue-700  2xl:w-[80%] mx-auto"
                        onClick={() => router.push(`/blog/${blog.slug}`)}
                    >
                        <div className="object-contain">
                            <img
                                className="rounded-t-lg  w-full lg:h-[250px] md:h-[250px] h-full"
                                src={blog.bannerImg}
                                alt=""
                            />
                        </div>

                        <div className="flex space-x-4 py-4 lg:px-7 md:px-4 px-2">
                            {/* userInfo */}
                            <img
                                className="h-10 w-10 rounded-full"
                                src={blog?.userImg || "https://i.ibb.co/Y8szkdm/images.jpg"}
                                alt=""
                            />
                            <div>
                                <div className="mb-3 text-xs">
                                    <h4 className="mb-1 font-semibold">{blog.userName}</h4>
                                    <p className="text-gray-700">
                                        {blog?.isEverUpdated && (
                                            <span className="text-green-500 font-semibold">
                                                Updated
                                            </span>
                                        )}{" "}
                                        <Moment format="D MMM ">{blog.time}</Moment> (
                                        <Moment fromNow>{blog.time}</Moment>)
                                    </p>
                                </div>

                                {/* title */}
                                <Link href={`/blog/${blog.slug}`}>
                                    <a className="lg:text-3xl md:text-2xl  font-semibold hover:text-blue-800">
                                        {blog.title}
                                    </a>
                                </Link>

                                {/* reaction and comments */}
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="mr-2 rounded py-2 px-3 text-sm font-light hover:bg-gray-100"
                                        >
                                            <FcLikePlaceholder className="mr-1 inline text-lg" /> 24
                                            reaction
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="mr-2 rounded py-2 px-3 text-sm font-light hover:bg-gray-100"
                                        >
                                            <FcComments className="mr-1 inline text-lg" /> 4
                                            comments
                                        </button>
                                    </div>
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="rounded bg-gray-200 py-2 px-4 text-sm font-light hover:bg-gray-300"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
