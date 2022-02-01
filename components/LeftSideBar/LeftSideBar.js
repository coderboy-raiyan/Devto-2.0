import Link from "next/link";
import React from "react";
import { FcBriefcase } from "react-icons/fc";

const LeftSideBar = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>
            <FcBriefcase className="inline" /> Reading List
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default LeftSideBar;
