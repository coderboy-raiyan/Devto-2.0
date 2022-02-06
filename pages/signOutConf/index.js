import React from "react";
import { useDispatch } from "react-redux";
import useFirebase from "../../components/Hooks/useFirebase";
import { setIsOpen } from "../../reducers/miniProfileSlice";
import Footer from "./../../components/Footer/Footer";
import Header from "./../../components/Header/Header";

const Index = () => {
  const { logout } = useFirebase();
  const dispatch = useDispatch();

  return (
    <>
      <header
        onClick={(e) => {
          dispatch(setIsOpen(false));
        }}
      >
        <Header />
      </header>

      <section
        onClick={(e) => {
          dispatch(setIsOpen(false));
        }}
        className="flex justify-center items-center h-screen bg-gray-100"
      >
        <div className="flex justify-center flex-col items-center space-y-4">
          <p className="text-2xl font-semibold">
            Are you sure you want to sign out?
          </p>
          <button
            onClick={logout}
            className="bg-blue-700 py-4 px-6 rounded text-white font-semibold text-sm hover:bg-blue-800"
          >
            Yes, sign out
          </button>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Index;
