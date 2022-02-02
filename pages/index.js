import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import LeftSideBar from "./../components/LeftSideBar/LeftSideBar";

NProgress.configure({ showSpinner: false });

const index = ({ data }) => {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <title>Dev community</title>
      </Head>

      <Header />

      <main className="bg-gray-100 ">
        <div className="lg:max-w-7xl lg:mx-auto md:max-w-7xl md:px-4 max-w-3xl px-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 py-4 transition-all">
          {/* left side bar */}

          <section className="lg:col-span-1 md:col-span-1 hidden md:inline-grid ">
            <LeftSideBar />
          </section>

          {/* middle news feed */}

          <section className="lg:col-span-2 md:col-span-2">
            <Feed blogs={data} />
          </section>

          {/* right side bar */}

          <section className="hidden lg:inline-grid col-span-1">
            <RightSideBar />
          </section>
        </div>
      </main>
    </>
  );
};

// all the blogs
export async function getServerSideProps() {
  const res = await axios("http://localhost:3000/api/blogs");
  const data = await res.data;

  return {
    props: { data },
  };
}

export default index;
