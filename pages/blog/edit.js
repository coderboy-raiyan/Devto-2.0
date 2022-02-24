import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Header from "../../components/Header/Header";

const Edit = () => {
  const router = useRouter();

  // load the data from database
  useEffect(() => {
    if (router.query.slug) {
      console.log(router.query.slug);
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Edit Post - DEV Community</title>
      </Head>

      <Header />

      <section>
        <h1>Hello</h1>
      </section>
    </>
  );
};

export default Edit;
