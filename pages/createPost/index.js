import Head from "next/head";
import React from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { setIsOpen } from "../../reducers/miniProfileSlice";

const CreatePost = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>New Post - DEV community</title>
      </Head>
      <header onClick={() => dispatch(setIsOpen(false))}>
        <Header />
      </header>

      <section onClick={() => dispatch(setIsOpen(false))}>
        <h1 className="p-4 pt-2">Hello</h1>
      </section>
    </>
  );
};

export default CreatePost;
