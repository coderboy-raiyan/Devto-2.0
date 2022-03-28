/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import axios from "axios";
import cogoToast from "cogo-toast";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import LoadingBtn from "../../components/Custom/LoadingBtn";
import Header from "../../components/Header/Header";
import useAuth from "../../Hooks/useAuth";
import useUploadImage from "../../Hooks/useUploadImage";
import { setIsOpen } from "../../redux/reducers/miniProfileSlice";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), {
    ssr: false,
});

function Edit() {
    const router = useRouter();
    const [prevBlog, setPrevBlog] = useState({});
    // form state
    const { register, handleSubmit, reset } = useForm();
    // is User blog posted
    const [isPostLoading, setIsPostLoading] = useState(false);

    const dispatch = useDispatch();
    const imgRef = useRef();
    // these states are only used for our suggestions
    const [suggestionContent, setSuggestionContent] = useState({});
    const [whichOption, setWhichOption] = useState("title");
    // editor state
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // input updated value getting by ref hooks
    const titleRef = useRef();
    const tagsRef = useRef();

    // user data form redux state
    const { user } = useAuth();

    // upload images custom hook
    const { uploadImg, removeImg, setFinalImg, setSelectedImg, finalImg, imgLoading, selectedImg } =
        useUploadImage();

    // load the data from database

    useEffect(() => {
        if (router.query.slug) {
            axios.get(`/api/blog/edit/${router.query.slug}`).then((res) => {
                setPrevBlog(res.data);
            });
        }
    }, [router, user]);

    // set the previous blog content
    useEffect(() => {
        if (prevBlog.editorState) {
            // set the previous blog banner image
            setFinalImg(prevBlog?.bannerImg);
            setSelectedImg(prevBlog?.bannerImg);

            // if convertFromRaw doesn't exists in the editor state case handled below
            if (!prevBlog.editorState.entityMap) {
                const content = prevBlog.editorState;
                const converted = EditorState.createWithContent(
                    convertFromRaw({ ...content, entityMap: {} })
                );
                setEditorState(converted);
            } else {
                const content = prevBlog.editorState;
                const converted = EditorState.createWithContent(convertFromRaw({ ...content }));
                setEditorState(converted);
            }
        }
    }, [prevBlog]);

    // handel suggestions
    useEffect(() => {
        handelSuggestions("title");
    }, []);

    // editor function handler
    const onEditorStateChange = (editorState) => {
        handelSuggestions("editor");
        setEditorState(editorState);
    };

    // handel Post data to database
    const onSubmit = useCallback(
        (data) => {
            const content = convertToRaw(editorState.getCurrentContent());
            if (user.email !== prevBlog.userEmail) {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You are not allowed to submit!",
                });
            }

            if (content.blocks[0].text === "") {
                return cogoToast.warn("Your text editor is empty, Please fill it ");
            }

            if (finalImg === "") {
                return cogoToast.warn("Please give a cover Image of your blog");
            }

            // all datas are here
            data.editorState = convertToRaw(editorState.getCurrentContent());
            data.bannerImg = finalImg;
            data.userName = user.displayName;
            data.userImg = user.photoURL;
            data.slug = router?.query?.slug;
            data.userEmail = user.email;
            data.title = titleRef.current.value;
            data.tags = tagsRef.current.value;
            data.isEverUpdated = true;
            data.time = new Date().toISOString();

            // sending to database and update
            setIsPostLoading(true);
            axios
                .put(`/api/blog/edit/${prevBlog._id}`, data)
                .then((data) => {
                    router.replace(`/blog/${prevBlog.slug}`);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsPostLoading(false);
                });
        },
        [editorState]
    );
    // cancel the edit blog
    const handelCancel = (e) => {
        router.replace("/");
    };

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
                <title>Edit Post - DEV Community</title>
            </Head>

            <Header />

            <section className=" bg-gray-100" onClick={() => dispatch(setIsOpen(false))}>
                <div className="grid max-w-3xl grid-cols-1 px-4 pb-14 md:max-w-6xl md:grid-cols-8 md:px-4 lg:mx-auto lg:max-w-7xl lg:grid-cols-10">
                    {/* editor side */}
                    <div className="col-span-1 my-4 mx-4 md:col-span-6 lg:col-span-7">
                        {/* edit and preview button */}
                        <div className="item-center mb-2 flex justify-end space-x-4">
                            <button className="primary-btn font-semibold">Edit</button>
                            <button className="primary-btn">Preview</button>
                        </div>
                        <div>
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
                                                                <a
                                                                    disabled={imgLoading}
                                                                    onClick={() =>
                                                                        imgRef.current.click()
                                                                    }
                                                                    className="rounded border-2 px-3 py-2 cursor-pointer font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
                                                                >
                                                                    Change
                                                                </a>
                                                                <a
                                                                    onClick={removeImg}
                                                                    className="font-semibold text-red-500 cursor-pointer"
                                                                >
                                                                    Remove
                                                                </a>
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

                                                    <a
                                                        onClick={() => imgRef.current.click()}
                                                        className="rounded-lg border-2 py-3 px-4 text-sm font-semibold text-gray-600 cursor-pointer mb-2 block lg:w-[174px] md:w-[174] w-full"
                                                    >
                                                        Add a cover image
                                                    </a>
                                                </>
                                            )}
                                        </div>

                                        {/* blog title */}

                                        <div className="my-2">
                                            <textarea
                                                type="text"
                                                placeholder="New post title here..."
                                                className="w-full border-none text-2xl font-bold placeholder:tracking-wide placeholder:text-gray-700 focus:outline-none focus:ring-0 md:text-3xl scrollbar-hide lg:text-5xl resize-none"
                                                onFocus={() => handelSuggestions("title")}
                                                defaultValue={prevBlog?.title}
                                                ref={titleRef}
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
                                                defaultValue={prevBlog?.tags}
                                                ref={tagsRef}
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
                                <div className="space-x-4">
                                    <button
                                        disabled={isPostLoading}
                                        className="disabled:opacity-75 hover:bg-blue-800 w-32 font-semibold my-4 border-2 border-transparent py-2 px-4 bg-blue-700 text-white rounded"
                                    >
                                        Save
                                    </button>
                                    <a
                                        disabled={isPostLoading}
                                        onClick={handelCancel}
                                        className="disabled:opacity-75 hover:text-red-500 border-2 border-transparent hover:border-red-500 hover:bg-transparent w-32 font-semibold my-4 cursor-pointer transition py-2 px-4 bg-red-500 text-white rounded"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Editor Suggestions  */}
                    <div className="hidden px-3 md:col-span-2 md:inline-grid lg:col-span-3 lg:inline-grid">
                        <div className="mt-36 grid h-2/3 grid-rows-3">
                            {/* title for editor */}

                            <div className={whichOption === "title" ? "visible" : "invisible"}>
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        {suggestionContent.title}
                                    </h1>
                                    <ul className="mt-2 list-disc space-y-3 px-6 text-[15px] font-light text-gray-600">
                                        {suggestionContent?.points?.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* tags for editor */}
                            <div className={whichOption === "tags" ? "visible" : "invisible"}>
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        {suggestionContent.title}
                                    </h1>
                                    <ul className="mt-2 list-disc space-y-3 px-6 text-[15px] font-light text-gray-600">
                                        {suggestionContent?.points?.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* editor for editor */}

                            <div className={whichOption === "editor" ? "visible" : "invisible"}>
                                <div>
                                    <h1 className="text-lg font-semibold">
                                        {suggestionContent.title}
                                    </h1>
                                    <ul className="mt-2 list-disc space-y-1 px-6 text-[15px] font-light text-gray-600">
                                        {suggestionContent?.points?.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Edit;
