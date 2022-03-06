import React, { createContext } from "react";
import useFirebase from "./../Hooks/useFirebase";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userData = useFirebase();
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
