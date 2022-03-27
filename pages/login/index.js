/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import MainLoader from "../../components/Custom/MainLoader";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFirebase from "../../Hooks/useFirebase";

function Login() {
    const { googleSignIn, githubSignIn } = useFirebase();
    const user = useSelector((state) => state.user.user);
    const isUserLoading = useSelector((state) => state.user.loading);
    const router = useRouter();

    if (isUserLoading) {
        return <MainLoader />;
    }

    if (user.email) {
        router.replace("/");
        return <MainLoader />;
    }

    return (
        <>
            <Head>
                <title>Welcome! - DEV community</title>
            </Head>
            <Header />

            {/* UI section starts */}
            <section className="flex  min-h-screen justify-center  bg-gray-100 px-4 pt-10">
                <div className="h-full min-h-[400px] w-full rounded-lg border bg-white px-16 py-16 shadow-sm md:w-2/4 lg:w-2/4">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold">Welcome to DEV community</h1>
                        <p className="my-2 text-sm tracking-wide">
                            <Link href="/">
                                <a className="text-blue-700 hover:underline">DEV community</a>
                            </Link>{" "}
                            is a community of 793,015 amazing developers
                        </p>
                    </div>
                    <ul className="my-7 space-y-2">
                        <li>
                            <button
                                onClick={githubSignIn}
                                className="mb-2 w-full rounded bg-gray-800 py-3 text-white hover:bg-gray-900"
                            >
                                <BsGithub className="mr-2 inline text-xl" /> Sign up with Github
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={googleSignIn}
                                className="w-full rounded border-2 bg-gray-100 py-3 text-black hover:bg-gray-200 "
                            >
                                <FcGoogle className="mr-2 inline text-xl" /> Sign up with Google
                            </button>
                        </li>
                    </ul>
                    <p className="text-center text-sm">Continue with your email address</p>
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Login;
