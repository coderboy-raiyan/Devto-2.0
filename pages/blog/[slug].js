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
import draftToHtml from "draftjs-to-html";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import {
    RiBookmarkFill,
    RiBookmarkLine,
    RiEvernoteFill,
    RiEvernoteLine,
    RiHeart2Fill,
    RiHeart2Line,
} from "react-icons/ri";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AuthorProfile from "../../components/AuthorProfile/AuthorProfile";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import baserUrl from "../../helpers/baseUrl";
import useAuth from "../../Hooks/useAuth";
import { setIsOpen } from "../../redux/reducers/miniProfileSlice";

function SingleBlog({ singleBlog }) {
    const router = useRouter();
    // user data from redux
    const { user } = useAuth();
    // load the blogs length for pagination value

    const dispatch = useDispatch();
    // like functionalities hooks
    const [likes, setLikes] = useState([]);
    const [isLikedLoading, setIsLikedLoading] = useState(false);
    const [switchLikeBtn, setSwitchLikeBtn] = useState(false);

    // Author checking hooks
    const [isAuthor, setIsAuthor] = useState(false);

    // check the main author of the blog
    useEffect(() => {
        if (singleBlog?.userEmail === user?.email) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [user]);

    // get the all likes
    useEffect(() => {
        axios(`/api/blog/likes/${singleBlog?._id}`).then((res) => {
            setLikes(res.data);
        });
    }, [isLikedLoading]);

    // check who give the like for this blog
    useEffect(() => {
        const isAlreadyHave = likes.find((like) => like.email === user?.email);

        if (isAlreadyHave) {
            setSwitchLikeBtn(true);
        } else {
            setSwitchLikeBtn(false);
        }
    }, [user, likes]);

    // handel Like post
    const handelLike = () => {
        // check if user exists or not
        if (!user.email) {
            return router.replace("/login");
        }

        // if exists then render these code
        setIsLikedLoading(true);
        const likedData = {
            email: user.email,
            blogId: singleBlog._id,
        };

        if (switchLikeBtn) {
            axios({
                method: "DELETE",
                url: "/api/blog/likes",
                data: likedData,
            }).then((res) => {
                setIsLikedLoading(false);
            });
        } else {
            axios
                .post(`/api/blog/likes`, likedData)
                .then((res) => {})
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsLikedLoading(false);
                });
        }
    };

    // handel edit button
    const handelEdit = (slug) => {
        if (!user.email) {
            return router.replace("/login");
        }
        if (slug) {
            router.push({
                pathname: "/blog/edit",
                query: {
                    slug,
                },
            });
        }
    };

    // handel blog delete
    const handelDeleteBlog = (id) => {
        if (!user.email) {
            return router.replace("/login");
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this blog?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/blog/delete/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        router.replace("/");
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    })
                    .catch((err) => console.log(err));
            } else {
                Swal.fire("success!", "Ok no problem.", "success");
            }
        });
    };

    return (
        <>
            <Head>
                <title>{singleBlog?.title} - DEV Community</title>
            </Head>

            <Header />

            <section
                onClick={() => dispatch(setIsOpen(false))}
                className="lg:max-w-full lg:px-auto md:max-w-7xl md:px-4 grid lg:grid-cols-10 md:grid-cols-8 grid-rows-8 lg:pt-4 lg:pb-20  md:py-2 bg-gray-100 gap-x-2"
            >
                {/* like comments and share section */}
                <div className="lg:col-span-1 md:col-span-1 row-span-2 lg:order-1 md:order-1 order-2 lg:inline-grid md:inline-grid">
                    <div className="like_parent_styles">
                        <ul className="like_button">
                            {/* like button */}
                            <li className="like_button_li">
                                {switchLikeBtn ? (
                                    <button
                                        onClick={handelLike}
                                        disabled={isLikedLoading}
                                        className="text-red-600 hover:bg-red-100 text-2xl border-2 border-red-600 bg-red-100 py-2 px-2 rounded-full"
                                    >
                                        <RiHeart2Fill />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handelLike}
                                        disabled={isLikedLoading}
                                        className="hover:text-red-500 hover:bg-red-100 text-2xl text-gray-700 py-2 px-2 rounded-full"
                                    >
                                        <RiHeart2Line />
                                    </button>
                                )}

                                <span className="font-light text-sm">{likes?.length}</span>
                            </li>
                            {/* boost button */}
                            <li className="like_button_li">
                                <button
                                    disabled
                                    className="hover:text-green-600 hover:bg-green-100 text-2xl text-gray-700 py-2 px-2 rounded-full"
                                >
                                    <RiEvernoteLine />
                                </button>
                                <button className="hidden">
                                    <RiEvernoteFill />
                                </button>
                                <span className="font-light text-sm">2</span>
                            </li>
                            {/* save button */}
                            <li className="like_button_li">
                                <button
                                    disabled
                                    className="hover:text-blue-700 hover:bg-blue-100 text-2xl text-gray-700 py-2 px-2 rounded-full"
                                >
                                    <RiBookmarkLine />
                                </button>
                                <button className="hidden">
                                    <RiBookmarkFill />
                                </button>
                                <span className="font-light text-sm">2</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* main blog area */}
                <div className="lg:col-span-6 md:col-span-7 row-span-6 order-1 lg:order-2 md:order-2">
                    <div className="bg-white border border-gray-200 rounded-lg">
                        {/* banner img */}
                        <div className="mb-8">
                            <img
                                className="w-full lg:h-[300px] h-full rounded-t-lg"
                                src={singleBlog?.bannerImg}
                                alt=""
                            />
                        </div>
                        {/* main content starts here */}
                        <div className="lg:px-16 md:px-10 px-4 py-2">
                            {/* author info */}
                            <div className="flex justify-between flex-wrap">
                                <div className="flex items-center space-x-2 pb-6">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={singleBlog?.userImg}
                                        alt=""
                                    />
                                    <p className="text-sm">
                                        <span className="font-semibold mb-1 block">
                                            {singleBlog?.userName}
                                        </span>
                                        <span className="text-gray-700 text-xs">
                                            {singleBlog?.isEverUpdated && (
                                                <span className="text-green-500 font-semibold">
                                                    Updated
                                                </span>
                                            )}{" "}
                                            <Moment format="D MMM ">{singleBlog.time}</Moment> (
                                            <Moment fromNow>{singleBlog.time}</Moment>)
                                        </span>
                                    </p>
                                </div>
                                {/* author area */}
                                {isAuthor && (
                                    <div className="">
                                        <div className="space-x-2 text-sm bg-[#FEF5E6] border border-[#f8e0b6] py-1 px-3 rounded-lg">
                                            <button
                                                onClick={() => handelEdit(singleBlog.slug)}
                                                className="p-2 hover:bg-[#F4EBDD] rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handelDeleteBlog(singleBlog._id)}
                                                className="p-2 hover:bg-[#F4EBDD] rounded"
                                            >
                                                Delete
                                            </button>
                                            <button className="p-2 hover:bg-[#F4EBDD] rounded">
                                                Stats
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* blog title */}
                            <div className="pb-3">
                                <h1 className="lg:text-5xl md:text-4xl text-3xl font-extrabold lg:leading-[55px]">
                                    {singleBlog?.title}
                                </h1>
                            </div>

                            {/* blog tags */}
                            <div className="mb-8">
                                <ul className="flex  text-sm">
                                    {singleBlog?.tags?.split(" ").map((tag, i) => (
                                        <li key={i}>
                                            <span className="py-2 px-2 hover:bg-gray-200 rounded-lg border-transparent border hover:border-gray-300 cursor-pointer text-gray-700">
                                                {tag}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* blog content */}
                            <article className="lg:prose-xl md:prose-lg prose prose-h2:!text-base prose-h2:!font-semibold prose-h1:!text-lg prose-h1:!font-semibold prose-a:!text-blue-600 prose-strong:!text-blue-600">
                                {ReactHtmlParser(draftToHtml(singleBlog?.editorState))}
                            </article>
                        </div>
                    </div>
                </div>

                {/* author profile */}
                <div className="lg:col-span-3 hidden lg:inline-grid custom_author order-3">
                    <AuthorProfile singleBlog={singleBlog} />
                </div>
            </section>

            {/* footer section */}
            <footer>
                <Footer />
            </footer>
        </>
    );
}

// get the blog from database using server side rendering

export async function getStaticPaths() {
    const res = await axios(`${baserUrl}/api/blogs/allblogs`);
    const data = res.data.blogs;

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
