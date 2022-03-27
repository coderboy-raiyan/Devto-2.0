/* eslint-disable react/prop-types */
import React, { createContext } from "react";
import useFirebase from "../../Hooks/useFirebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const userData = useFirebase();
    return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
