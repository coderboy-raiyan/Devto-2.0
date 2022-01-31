import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";
import Header from "../components/Header/Header";

NProgress.configure({ showSpinner: false });

const index = () => {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <div>
      <Head>
        <title>Dev community</title>
      </Head>

      <Header />

      <main></main>
    </div>
  );
};

export default index;
