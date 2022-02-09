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

      <section
        className="min-h-screen  bg-gray-100"
        onClick={() => dispatch(setIsOpen(false))}
      >
        {/* editor side */}
        <div className="grid max-w-3xl grid-cols-1 px-4 md:max-w-6xl md:grid-cols-8 md:px-4 lg:mx-auto lg:max-w-7xl lg:grid-cols-8">
          <div className="col-span-1 my-4 mx-4 md:col-span-6 lg:col-span-6">
            {/* editor starts-here */}

            <div className="rounded border bg-white py-6 px-11">
              <div></div>
            </div>
          </div>
          {/* Editor Suggestions  */}
          <div className="hidden md:col-span-2 md:inline-grid lg:col-span-2 lg:inline-grid">
            <h1>Suggestions section</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
