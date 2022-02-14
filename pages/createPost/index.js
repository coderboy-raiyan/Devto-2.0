/* eslint-disable @next/next/no-img-element */
import cogoToast from "cogo-toast";
import { convertToRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import Header from "../../components/Header/Header";
import { setIsOpen } from "../../reducers/miniProfileSlice";
import Footer from "./../../components/Footer/Footer";
import useUploadImage from "./../../components/Hooks/useUploadImage";
import LoadingBtn from "./../../components/Shared/LoadingBtn";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

const CreatePost = () => {
  // form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const imgRef = useRef();
  // these states are only used for our suggestions
  const [suggestionContent, setSuggestionContent] = useState({});
  const [whichOption, setWhichOption] = useState("title");
  // editor state
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isTextEditorEmpty, setIsTextEditorEmpty] = useState(true);

  // upload images hook
  const { uploadImg, removeImg, finalImg, imgLoading, selectedImg } =
    useUploadImage();

  // editor function handler
  const onEditorStateChange = (editorState) => {
    handelSuggestions("editor");
    setEditorState(editorState);
    const content = convertToRaw(editorState.getCurrentContent());
    if (content.blocks[0].text === "") {
      setIsTextEditorEmpty(true);
    } else {
      setIsTextEditorEmpty(false);
    }
  };

  // handel Post data to database
  const onSubmit = (data) => {
    if (isTextEditorEmpty) {
      return cogoToast.warn("Your text editor is empty, Please fill it");
    }
    if (finalImg === "") {
      return cogoToast.warn("Please give a cover Image of your blog");
    }

    data.editorState = convertToRaw(editorState.getCurrentContent());
    data.bannerImg = finalImg;
    console.log(data);
  };

  // handel suggestions
  useEffect(() => {
    handelSuggestions("title");
  }, []);

  const handelSuggestions = (type) => {
    if (type === "title") {
      // data
      setWhichOption("title");
      setSuggestionContent({
        title: "Writing a Great Post Title",
        points: [
          "Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.",
          "Use keywords where appropriate to help ensure people can find your post by search.",
        ],
      });
    } else if (type === "tags") {
      setWhichOption("tags");
      setSuggestionContent({
        title: "Tagging Guidelines",
        points: [
          "Tags help people find your post.",
          "Think of tags as the topics or categories that best describe your post.",
          "Add up to four comma-separated tags per post. Combine tags to reach the appropriate subcommunities.",
        ],
      });
    } else {
      setWhichOption("editor");
      setSuggestionContent({
        title: "Editor Basics",
        points: [
          "Feel free to write",
          "There is icon of image to upload images in your blog",
          "Use Image links for upload image",
        ],
      });
    }
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
        className=" bg-gray-100"
        onClick={() => dispatch(setIsOpen(false))}
      >
        <div className="grid max-w-3xl grid-cols-1 px-4 pb-14 md:max-w-6xl md:grid-cols-8 md:px-4 lg:mx-auto lg:max-w-7xl lg:grid-cols-10">
          {/* editor side */}
          <div className="col-span-1 my-4 mx-4 md:col-span-6 lg:col-span-7">
            {/* edit and preview button */}
            <div className="item-center mb-2 flex justify-end space-x-4">
              <button className="primary-btn font-semibold">Edit</button>
              <button className="primary-btn">Preview</button>
            </div>
            <div className="">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg border py-6 h-full min-h-[400px] ">
                  <div className="px-11">
                    {/* cover image */}
                    <div>
                      {/* show image if it's exists */}
                      {selectedImg ? (
                        <>
                          {imgLoading ? (
                            <LoadingBtn />
                          ) : (
                            <div className="flex h-auto w-full flex-wrap space-y-4 lg:w-[520px]">
                              <div className="rounded-lg border-2 border-gray-300 object-contain">
                                <img
                                  className="h-[150px] w-[300px] rounded-lg"
                                  src={finalImg}
                                  alt=""
                                />
                              </div>
                              {/* remove and change button */}
                              <div className="flex flex-wrap items-center justify-between space-x-4 px-2 text-sm">
                                <button
                                  disabled={imgLoading}
                                  onClick={() => imgRef.current.click()}
                                  className="rounded border-2 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
                                >
                                  Change
                                </button>
                                <button
                                  onClick={removeImg}
                                  className="font-semibold text-red-500"
                                >
                                  Remove
                                </button>
                                <input
                                  onChange={uploadImg}
                                  ref={imgRef}
                                  type="file"
                                  className="hidden"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        // Select a banner Image button
                        <>
                          <input
                            onChange={uploadImg}
                            ref={imgRef}
                            type="file"
                            className="hidden"
                          />

                          <button
                            onClick={(e) => {
                              imgRef.current.click();
                            }}
                            className="rounded-lg border-2 py-3 px-4 text-sm font-semibold text-gray-600"
                          >
                            Add a cover image
                          </button>
                        </>
                      )}
                    </div>

                    {/* blog title */}

                    <div className="my-2">
                      <input
                        type="text"
                        placeholder="New post title here..."
                        className="w-full border-none text-2xl font-bold placeholder:tracking-wide placeholder:text-gray-700 focus:outline-none focus:ring-0 md:text-3xl lg:text-5xl"
                        onFocus={() => handelSuggestions("title")}
                        {...register("title")}
                        required
                      />
                    </div>

                    {/* blog tags */}
                    <div>
                      <input
                        type="text"
                        placeholder="Add upto 4 tags..."
                        className="w-full focus:outline-none border-none placeholder:tracking-wider placeholder:text-gray-500 focus:ring-0"
                        onFocus={() => handelSuggestions("tags")}
                        {...register("tags")}
                        required
                      />
                    </div>
                  </div>

                  <div className="my-4">
                    <Editor
                      placeholder="Write your post content here..."
                      className="text-black "
                      editorState={editorState}
                      toolbarClassName="!py-3 !border-none !bg-[#f9f9f9] !px-11"
                      wrapperClassName="!border-none"
                      editorClassName="!px-11 !h-full !min-h-[200px]"
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
                </div>

                {/* Submit buttons */}
                <div>
                  <button
                    // disabled={isTextEditorEmpty}
                    className="disabled:opacity-75 hover:bg-blue-800 w-32 font-semibold my-4 py-2 px-4 bg-blue-700 text-white rounded"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Editor Suggestions  */}
          <div className="hidden px-3 md:col-span-2 md:inline-grid lg:col-span-3 lg:inline-grid">
            <Fade top>
              <div className="mt-36 grid h-2/3 grid-rows-3">
                {/* title for editor */}

                <div
                  className={whichOption === "title" ? "visible" : "invisible"}
                >
                  {
                    <div>
                      <h1 className="text-lg font-semibold">
                        {suggestionContent.title}
                      </h1>
                      <ul className="mt-2 list-disc space-y-3 px-6 text-[15px] font-light text-gray-600">
                        {suggestionContent?.points?.map((point, i) => {
                          return <li key={i}>{point}</li>;
                        })}
                      </ul>
                    </div>
                  }
                </div>

                {/* tags for editor */}
                <div
                  className={whichOption === "tags" ? "visible" : "invisible"}
                >
                  {
                    <div>
                      <h1 className="text-lg font-semibold">
                        {suggestionContent.title}
                      </h1>
                      <ul className="mt-2 list-disc space-y-3 px-6 text-[15px] font-light text-gray-600">
                        {suggestionContent?.points?.map((point, i) => {
                          return <li key={i}>{point}</li>;
                        })}
                      </ul>
                    </div>
                  }
                </div>

                {/* editor for editor */}

                <div
                  className={whichOption === "editor" ? "visible" : "invisible"}
                >
                  {
                    <div>
                      <h1 className="text-lg font-semibold">
                        {suggestionContent.title}
                      </h1>
                      <ul className="mt-2 list-disc space-y-1 px-6 text-[15px] font-light text-gray-600">
                        {suggestionContent?.points?.map((point, i) => {
                          return <li key={i}>{point}</li>;
                        })}
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </Fade>
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
