import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../../reducers/userSlice";
import initializeAuth from "./../../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

initializeAuth();

const useFirebase = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  //   google sign In
  const googleSignIn = () => {
    dispatch(setLoading(true));
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        dispatch(setError(""));
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
    logout,
  };
};

export default useFirebase;
