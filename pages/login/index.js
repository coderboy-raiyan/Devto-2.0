import Head from "next/head";
import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Header from "../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import useFirebase from "./../../components/Hooks/useFirebase";

const Login = () => {
  const { googleSignIn, logout } = useFirebase();

  return (
    <>
      <Head>
        <title>Welcome! - DEV community</title>
      </Head>
      <Header />

      {/* UI section starts */}
      <section className="bg-gray-100  flex justify-center  min-h-screen pt-10 px-4">
        <div className="bg-white rounded-lg border lg:w-2/4 md:w-2/4 w-full px-16 py-16 h-full min-h-[400px] shadow-sm">
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
              <button className="bg-gray-800 text-white w-full py-3 rounded mb-2 hover:bg-gray-900">
                <BsGithub className="inline text-xl mr-2" /> Sign up with Github
              </button>
            </li>
            <li>
              <button className="bg-gray-100 text-black hover:bg-gray-200 border-2 w-full py-3 rounded ">
                <FcGoogle className="inline text-xl mr-2" /> Sign up with Google
              </button>
            </li>
          </ul>
          <p className="text-center text-sm">
            Continue with your email address
          </p>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Login;
