import React, { createContext } from "react";
import { useSelector } from "react-redux";
import useFirebase from "./../Hooks/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userData = useFirebase();
  const isUserLoading = useSelector((state) => state.user.loading);

  if (isUserLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
