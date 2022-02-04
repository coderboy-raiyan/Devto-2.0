import React from "react";

const RightSideBar = () => {
  const allTags = [
    {
      tagName: "discuss",
      tags: [
        {
          slug: "Why I Stopped Interviewing with Companies That",
        },
        {
          slug: "Do you use GRPC?",
        },
        {
          slug: "Which css framework do you use?",
        },
        {
          slug: "Which css framework do you use?",
        },
        {
          slug: "Simple examples of NodeJS servers: Express, Koa and Hapi | Discussion.",
        },
      ],
    },
    {
      tagName: "challenge",
      tags: [
        {
          slug: "Day 4 of 100 Days Of Code",
        },
        {
          slug: "Python Beginners Guide - Functions",
        },
        {
          slug: "Day 3 of 100DaysOfCode",
        },
        {
          slug: "Next generation Hello World program",
        },
        {
          slug: "Advent Of Code 2021 – Hydrothermal Venture – Puzzle 5",
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-2 ">
      {/* trending tags */}
      <div className="col-span-2 mx-4 space-y-4">
        <ul
          className="flex flex-col pt-4 rounded-lg border text-sm text-gray-700"
          style={{ backgroundColor: "rgba(250,250,250,1)" }}
        >
          {
            <li className="text-lg px-4 py-2 font-semibold">
              #{allTags[0].tagName}
            </li>
          }

          {allTags[0].tags.map((tag, i) => (
            <li
              className="border-b px-4 py-5 cursor-pointer hover:bg-white hover:text-blue-600 "
              key={i}
            >
              {tag.slug}
            </li>
          ))}
        </ul>
        <ul
          className=" flex flex-col pt-4 rounded-lg border text-sm text-gray-700"
          style={{ backgroundColor: "rgba(250,250,250,1)" }}
        >
          {
            <li className="text-lg px-4 py-2 font-semibold">
              #{allTags[1].tagName}
            </li>
          }

          {allTags[1].tags.map((tag, i) => (
            <li
              className="border-b px-4 py-5 cursor-pointer hover:bg-white hover:text-blue-600"
              key={i}
            >
              {tag.slug}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSideBar;
