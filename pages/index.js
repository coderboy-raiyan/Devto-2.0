import Head from "next/head";
import React from "react";
import Header from "../components/Header/Header";

const index = () => {
  return (
    <div>
      <Head>
        <title>Dev community</title>
      </Head>
      <main>
        <Header />
      </main>
    </div>
  );
};

export default index;
