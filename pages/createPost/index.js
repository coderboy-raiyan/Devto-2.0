import { convertToRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { setIsOpen } from "../../reducers/miniProfileSlice";
import Footer from "./../../components/Footer/Footer";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const CreatePost = () => {
  const dispatch = useDispatch();

  // editor state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // editor function handler
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const content = convertToRaw(editorState.getCurrentContent());
    console.log(content);
  };

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

            <div className="h-full min-h-[500px] rounded border bg-white py-6 px-11">
              <form>
                {/* cover image */}
                <div>
                  <input type="file" className="hidden" />
                  <button className="rounded-lg border-2 py-3 px-4 text-sm font-semibold text-gray-600">
                    Add a cover image
                  </button>
                </div>

                {/* blog title */}

                <div className="my-2">
                  <input
                    type="text"
                    placeholder="New post title here..."
                    className="w-full border-none text-2xl font-bold placeholder:text-gray-600 focus:ring-0 md:text-3xl lg:text-5xl"
                  />
                </div>

                {/* blog tags */}
                <div>
                  <input
                    type="text"
                    placeholder="Add upto 4 tags..."
                    className="w-full border-none placeholder:text-gray-500 focus:ring-0"
                  />
                </div>

                <div className="my-4">
                  <Editor
                    placeholder="Write your post content here..."
                    className="text-black"
                    editorState={editorState}
                    toolbarClassName="!py-3 !border-none !bg-gray-50 !px-5"
                    wrapperClassName="!border-none"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      fontFamily: {
                        options: [
                          "Arial",
                          "Georgia",
                          "Impact",
                          "Tahoma",
                          "Times New Roman",
                          "Poppins",
                        ],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
                    }}
                    mention={{
                      separator: " ",
                      trigger: "@",
                      suggestions: [
                        {
                          text: "PROGRAMMER",
                          value: "Programmer",
                          url: "/programmer",
                        },
                        {
                          text: "JAVASCRIPT",
                          value: "javascript",
                          url: "/javascript",
                        },
                        {
                          text: "REACT",
                          value: "React",
                          url: "/react",
                        },
                      ],
                    }}
                    hashtag={{
                      separator: " ",
                      trigger: "#",
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
          {/* Editor Suggestions  */}
          <div className="hidden md:col-span-2 md:inline-grid lg:col-span-2 lg:inline-grid">
            <h1>Suggestions section</h1>
          </div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default CreatePost;
