import React from "react";
import useFirebase from "./../../components/Hooks/useFirebase";

const Login = () => {
  const { googleSignIn, logout } = useFirebase();
  return (
    <div>
      <h1>This is login</h1>
      <button onClick={googleSignIn}>Login</button>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Login;
