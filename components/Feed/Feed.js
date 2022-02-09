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
        {blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="my-2 cursor-pointer rounded-lg border border-gray-300 bg-white ring-2  ring-transparent hover:border-transparent hover:ring-blue-700"
              onClick={() => router.push(`/blog/${blog.slug}`)}
            >
              <div>
                <img className="rounded-t-lg" src={blog.bannerImg} alt="" />
              </div>

              <div className="flex space-x-4 py-4 px-7">
                {/* userInfo */}
                <img
                  className="h-10 w-10 rounded-full"
                  src={blog.userImg}
                  alt=""
                />
                <div>
                  <div className="mb-3 text-xs">
                    <h4 className="mb-1 font-semibold">{blog.userName}</h4>
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
                  <div className="mt-4 flex justify-between">
                    <div>
                      <button className="mr-2 rounded py-2 px-3 text-sm font-light hover:bg-gray-100">
                        <FcLikePlaceholder className="mr-1 inline text-lg" /> 24
                        reaction
                      </button>
                      <button className="mr-2 rounded py-2 px-3 text-sm font-light hover:bg-gray-100">
                        <FcComments className="mr-1 inline text-lg" /> 4
                        comments
                      </button>
                    </div>
                    <button className="rounded bg-gray-200 py-2 px-4 text-sm font-light hover:bg-gray-300">
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
