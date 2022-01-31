import React from "react";
import Header from "../../components/Header/Header";
import useFirebase from "./../../components/Hooks/useFirebase";

const Login = () => {
  const { googleSignIn, logout } = useFirebase();
  return (
    <>
      <Header />
      <h1>This is login</h1>
      <button onClick={googleSignIn}>Login</button>
      <br />
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Login;
