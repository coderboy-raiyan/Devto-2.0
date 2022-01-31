import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initializeAuth = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuth;
