import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../../reducers/userSlice";
import initializeAuth from "./../../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

initializeAuth();

const useFirebase = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const router = useRouter();

  console.log(router);

  //   google sign In
  const googleSignIn = () => {
    dispatch(setLoading(true));
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        dispatch(setError(""));
        router.back();
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  // Github provider
  const githubSignIn = () => {
    dispatch(setLoading(true));
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        dispatch(setError(""));
        router.back();
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //   Log out

  const logout = () => {
    dispatch(setLoading(true));
    signOut(auth)
      .then(() => {
        dispatch(setUser({}));
        dispatch(setError(""));
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user));
          console.log(user);
        } else {
          dispatch(setUser({}));
        }
        dispatch(setLoading(false));
      }),
    []
  );

  return {
    googleSignIn,
    githubSignIn,
    logout,
  };
};

export default useFirebase;
