import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BlogsLoader from "../components/Custom/BlogsLoader";
import Feed from "../components/Feed/Feed";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import initializeAuth from "../Firebase/Firebase.init";
import { setIsOpen } from "../reducers/miniProfileSlice";
import LeftSideBar from "./../components/LeftSideBar/LeftSideBar";
import baserUrl from "./../helpers/baseUrl";

NProgress.configure({ showSpinner: false });
initializeAuth();

const Index = ({ data }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(data.blogs);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);
  // close mini profile

  console.log(blogs);

  const handelLoadMore = () => {
    setIsBlogsLoading(true);
    axios({
      url: `/api/blogs?size=${blogs.length}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.blogs);
        const newLoaded = [...blogs, ...res.data.blogs];
        setBlogs(newLoaded);
      })
      .finally(() => {
        setIsBlogsLoading(false);
      });
  };

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <title>DEV Community</title>
      </Head>

      <Header />

      <main onClick={() => dispatch(setIsOpen(false))} className="bg-gray-100 ">
        <div className="grid max-w-3xl grid-cols-1 px-4 py-4 transition-all md:max-w-7xl md:grid-cols-3 md:px-4 lg:mx-auto lg:max-w-full lg:grid-cols-4">
          {/* left side bar */}

          <section className="hidden md:col-span-1 md:inline-grid lg:col-span-1 ">
            <LeftSideBar />
          </section>

          {/* middle news feed */}

          <section className="md:col-span-2 lg:col-span-2">
            <Feed blogs={blogs} />

            {/* loader for blogs */}
            {isBlogsLoading && <BlogsLoader />}

            {/* load more button */}
            {data.size !== blogs?.length && (
              <div>
                <button
                  className="bg-[#b5bdc4] hover:bg-[#a6a9ac] text-[#08090a] mt-6 py-4 px-6 text-sm font-semibold rounded"
                  onClick={handelLoadMore}
                >
                  Load more...
                </button>
              </div>
            )}
          </section>

          {/* right side bar */}

          <section className="col-span-1 hidden lg:inline-grid">
            <RightSideBar />
          </section>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

// all the blogs
export async function getServerSideProps() {
  const res = await axios(`${baserUrl}/api/blogs`);
  const data = await res.data;

  return {
    props: { data },
  };
}

export default Index;
