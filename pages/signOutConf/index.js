/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Head from "next/head";
import React from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import useFirebase from "../../components/Hooks/useFirebase";
import { setIsOpen } from "../../reducers/miniProfileSlice";

function Index() {
    const { logout } = useFirebase();
    const dispatch = useDispatch();

    return (
        <>
            <Head>
                <title>Confirm Signout - DEV community</title>
            </Head>

            <Header />

            <section
                onClick={() => {
                    dispatch(setIsOpen(false));
                }}
                className="flex h-screen items-center justify-center bg-gray-100"
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <p className="text-2xl font-semibold">Are you sure you want to sign out?</p>
                    <button
                        onClick={logout}
                        className="rounded bg-blue-700 py-4 px-6 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                        Yes, sign out
                    </button>
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Index;
