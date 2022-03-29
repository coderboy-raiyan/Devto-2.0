/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function UnAuthenticatedLayout({ children, title }) {
    const { user } = useAuth();
    const router = useRouter();
    if (user.email) {
        router.push("/");
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div>
                {user.email ? null : <Header />}
                {user.email ? null : children}
                {user.email ? null : <Footer />}
            </div>
        </>
    );
}

export default UnAuthenticatedLayout;
