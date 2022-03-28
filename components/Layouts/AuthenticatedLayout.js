/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import useAuth from "../../Hooks/useAuth";

function AuthenticatedLayout({ children, title }) {
    const { user } = useAuth();
    const router = useRouter();
    if (!user.email) {
        router.push("/login");
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div>{user.email ? children : null}</div>
        </>
    );
}

export default AuthenticatedLayout;
