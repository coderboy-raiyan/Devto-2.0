import Link from "next/link";
import React from "react";
import {
  FcBriefcase,
  FcBusinessContact,
  FcHome,
  FcIdea,
  FcLike,
  FcMms,
  FcNightLandscape,
  FcParallelTasks,
  FcSalesPerformance,
  FcSelfServiceKiosk,
  FcShop,
} from "react-icons/fc";

const LeftSideBar = () => {
  const menus = [
    {
      icon: FcBriefcase,
      content: "Reading List",
      link: "/",
    },
    {
      icon: FcHome,
      content: "Home",
      link: "/",
    },
    {
      icon: FcSalesPerformance,
      content: "Listings",
      link: "/",
    },
    {
      icon: FcSelfServiceKiosk,
      content: "Podcasts",
      link: "/",
    },
    {
      icon: FcNightLandscape,
      content: "Videos",
      link: "/",
    },
    {
      icon: FcParallelTasks,
      content: "Tags",
      link: "/",
    },
    {
      icon: FcIdea,
      content: "FAQ",
      link: "/",
    },
    {
      icon: FcShop,
      content: "DEV Shop",
      link: "/",
    },
    {
      icon: FcLike,
      content: "Sponsors",
      link: "/",
    },
    {
      icon: FcMms,
      content: "About",
      link: "/",
    },
    {
      icon: FcBusinessContact,
      content: "Contact",
      link: "/",
    },
  ];
  return (
    <ul className="flex flex-col space-y-2 text-[15px] px-5">
      {menus.map((links, i) => {
        return (
          <li className="primary-btn py-2 cursor-pointer" key={i}>
            <Link href="/">
              <a>
                <links.icon className="inline mr-2 text-2xl" />
                {links.content}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default LeftSideBar;
