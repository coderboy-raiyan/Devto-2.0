import React from "react";

const Feed = ({ blogs }) => {
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
    </div>
  );
};

export default Feed;
