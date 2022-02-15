import axios from "axios";
import Head from "next/head";
import React from "react";
import Header from "../../components/Header/Header";
import baserUrl from "./../../helpers/baseUrl";

const SingleBlog = ({ singleBlog }) => {
  console.log(singleBlog);
  return (
    <>
      <Head>
        <title>{singleBlog?.title}</title>
      </Head>

      <header>
        <Header />
      </header>

      <h1>Single blog</h1>
    </>
  );
};

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
