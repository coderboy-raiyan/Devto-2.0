import { css } from "@emotion/react";
import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import useFirebase from "./../Hooks/useFirebase";

export const AuthContext = createContext();

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36d7b7;
`;

const AuthProvider = ({ children }) => {
  const userData = useFirebase();
  const isUserLoading = useSelector((state) => state.user.loading);
  const [color, setColor] = useState("#36D7B7");

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div>
          <HashLoader color={color} css={override} size={100} />;
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
