/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import {
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import initializeAuth from "../Firebase/Firebase.init";

initializeAuth();
export const AuthContext = createContext({});

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function AuthProvider({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    // const router = useRouter();

    //   google sign In
    const googleSignIn = async () => {
        setAuthLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            setError("");
            setAuthLoading(false);
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
            setAuthLoading(false);
        }
    };

    // github sign In
    const githubSignIn = async () => {
        setAuthLoading(true);
        try {
            await signInWithPopup(auth, githubProvider);
            setError("");
            setAuthLoading(false);
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
            setAuthLoading(false);
        }
    };

    // auth tracking
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    console.log(user);
                } else {
                    setUser({});
                }
                setLoading(false);
            }),
        [auth]
    );

    // logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser({});
            setError("");
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
        }
    };

    const returnObj = {
        user,
        error,
        loading,
        authLoading,
        googleSignIn,
        githubSignIn,
        logout,
        setError,
    };

    return (
        <AuthContext.Provider value={returnObj}>
            {loading ? "Loading" : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
