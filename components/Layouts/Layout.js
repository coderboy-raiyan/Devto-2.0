/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import useAuth from "../../Hooks/useAuth";
import AuthenticatedLayout from "./AuthenticatedLayout";
import UnAuthenticatedLayout from "./UnAuthenticatedLayout";

function Layout({ children }) {
    const { user } = useAuth();
    return (
        <div>
            {user.email ? (
                <AuthenticatedLayout>{children}</AuthenticatedLayout>
            ) : (
                <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>
            )}
        </div>
    );
}

export default Layout;
