/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FcComments, FcLikePlaceholder } from "react-icons/fc";
import Moment from "react-moment";

const Feed = ({ blogs }) => {
  const router = useRouter();

  console.log(blogs);
  return (
    <div>
      {/* feed header */}
      <ul className="flex space-x-7">
        <li className="font-semibold hover:bg-white hover:text-blue-600 py-2 cursor-pointer rounded px-3">
          Relevant
        </li>
        <li className="hover:bg-white hover:text-blue-600 py-2 cursor-pointer rounded px-3">
          Latest
        </li>
        <li className="hover:bg-white hover:text-blue-600 py-2 cursor-pointer rounded px-3">
          Top
        </li>
      </ul>

      {/* feed starts here */}

      <div>
        {/* single feed */}
        {blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="bg-white border border-gray-300 rounded-lg my-2 cursor-pointer hover:ring-blue-700  hover:border-transparent ring-2 ring-transparent"
              onClick={() => router.push(`/blog/${blog.slug}`)}
            >
              <div>
                <img className="rounded-t-lg" src={blog.bannerImg} alt="" />
              </div>

              <div className="py-4 px-7 flex space-x-4">
                {/* userInfo */}
                <img
                  className="w-10 h-10 rounded-full"
                  src={blog.userImg}
                  alt=""
                />
                <div>
                  <div className="text-xs mb-3">
                    <h4 className="font-semibold mb-1">{blog.userName}</h4>
                    <Moment format="YYYY/MM/DD" className="text-gray-700">
                      {blog.time}
                    </Moment>
                  </div>

                  {/* title */}
                  <Link href={`/blog/${blog.slug}`}>
                    <a className="text-3xl font-semibold hover:text-blue-800">
                      {blog.title}
                    </a>
                  </Link>

                  {/* reaction and comments */}
                  <div className="flex justify-between mt-4">
                    <div>
                      <button className="py-2 px-3 hover:bg-gray-100 font-light text-sm rounded mr-2">
                        <FcLikePlaceholder className="inline text-lg mr-1" /> 24
                        reaction
                      </button>
                      <button className="py-2 px-3 hover:bg-gray-100 font-light text-sm rounded mr-2">
                        <FcComments className="inline text-lg mr-1" /> 4
                        comments
                      </button>
                    </div>
                    <button className="py-2 px-4 bg-gray-200 rounded text-sm hover:bg-gray-300 font-light">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
