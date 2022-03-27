/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
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

function LeftSideBar() {
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
        <ul className="flex flex-col space-y-2 px-5 text-[15px]">
            {menus.map((links, i) => (
                <li className="primary-btn cursor-pointer py-2" key={i}>
                    <Link href="/">
                        <a>
                            <links.icon className="mr-2 inline text-2xl" />
                            {links.content}
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default LeftSideBar;
