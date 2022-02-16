/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import draftToHtml from "draftjs-to-html";
import Head from "next/head";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiEvernoteFill,
  RiEvernoteLine,
  RiHeart2Fill,
  RiHeart2Line,
} from "react-icons/ri";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AuthorProfile from "./../../components/AuthorProfile/AuthorProfile";
import baserUrl from "./../../helpers/baseUrl";

const SingleBlog = ({ singleBlog }) => {
  console.log(singleBlog);
  const user = useSelector((state) => state.user.user);

  console.log(singleBlog?.tags.split(" "));

  return (
    <>
      <Head>
        <title>{singleBlog?.title} - DEV Community</title>
      </Head>

      <header>
        <Header />
      </header>

      <section className="lg:max-w-full lg:px-auto md:max-w-7xl md:px-4 grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 lg:py-2 md:py-2 bg-gray-100  gap-x-2">
        {/* like comments and share section */}
        <div className="lg:col-span-1 md:col-span-1 hidden lg:inline-grid md:inline-grid">
          <div className="flex justify-center items-start mt-10">
            <ul className="space-y-4">
              <li className="flex flex-col items-center space-y-1">
                <button className="hover:text-red-500 hover:bg-red-100 text-2xl text-gray-700 py-2 px-2 rounded-full">
                  <RiHeart2Line />
                </button>
                <button className="hidden">
                  <RiHeart2Fill />
                </button>
                <span className="font-light text-sm">2</span>
              </li>
              <li className="flex flex-col items-center space-y-1">
                <button className="hover:text-green-600 hover:bg-green-100 text-2xl text-gray-700 py-2 px-2 rounded-full">
                  <RiEvernoteLine />
                </button>
                <button className="hidden">
                  <RiEvernoteFill />
                </button>
                <span className="font-light text-sm">2</span>
              </li>
              <li className="flex flex-col items-center space-y-1">
                <button className="hover:text-blue-700 hover:bg-blue-100 text-2xl text-gray-700 py-2 px-2 rounded-full">
                  <RiBookmarkLine />
                </button>
                <button className="hidden">
                  <RiBookmarkFill />
                </button>
                <span className="font-light text-sm">2</span>
              </li>
            </ul>
          </div>
        </div>

        {/* main blog area */}
        <div className="lg:col-span-8 md:col-span-7">
          <div className="bg-white border rounded-lg">
            {/* banner img */}
            <div className="mb-8">
              <img
                className="w-full h-[300px] rounded-t-lg"
                src={singleBlog?.bannerImg}
                alt=""
              />
            </div>
            {/* main content starts here */}
            <div className="lg:px-16 md:px-10 px-4 py-2">
              {/* author info */}
              <div className="flex items-center space-x-2 pb-6">
                <img
                  className="w-10 h-10 rounded-full"
                  src={singleBlog?.userImg}
                  alt=""
                />
                <p className="text-sm">
                  <span className="font-semibold mb-1 block">
                    {singleBlog?.userName}
                  </span>
                  <span className="text-gray-700 text-xs">
                    <Moment format="D MMM ">{singleBlog.time}</Moment> (
                    <Moment fromNow>{singleBlog.time}</Moment>)
                  </span>
                </p>
              </div>
              {/* blog title */}
              <div className="pb-3">
                <h1 className="lg:text-5xl md:text-4xl text-3xl font-extrabold lg:leading-[55px]">
                  {singleBlog?.title}
                </h1>
              </div>

              {/* blog tags */}
              <div className="mb-8">
                <ul className="flex  text-sm">
                  {singleBlog?.tags?.split(" ").map((tag, i) => (
                    <li
                      className="py-2 px-2 hover:bg-gray-200 rounded-lg border-transparent border hover:border-gray-300 cursor-pointer text-gray-700"
                      key={i}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              {/* blog content */}
              <article className="prose prose-a:text-blue-600">
                {ReactHtmlParser(draftToHtml(singleBlog?.editorState))}
              </article>
            </div>
          </div>
        </div>

        {/* author profile */}
        <div className="lg:col-span-3 hidden lg:inline-grid">
          <AuthorProfile />
        </div>
      </section>

      {/* footer section */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

// get the blog from database using server side rendering

export async function getStaticPaths() {
  const res = await axios(`${baserUrl}/api/blogs`);
  const data = res.data;

  const paths = data.map((blog) => ({
    params: {
      slug: blog?.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await axios(`${baserUrl}/api/blogs/${params.slug}`);
  const singleBlog = res.data;

  return {
    props: {
      singleBlog,
    },
    revalidate: 10,
  };
}

export default SingleBlog;
