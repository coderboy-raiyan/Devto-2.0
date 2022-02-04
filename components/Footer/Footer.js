import React from "react";
import { FcVoicemail } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="bg-gray-200 py-20 text-center text-[14px] font-light space-y-4">
      <p className="">
        <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
          DEV Community
        </span>{" "}
        — A constructive and inclusive social network for software developers.
        With you every step of your journey.
      </p>
      <p className="w-2/4 mx-auto">
        Built on Forem — the open source software that powers DEV and other
        inclusive communities. Made with love and Ruby on Rails. DEV Community ©
        2016 - 2022.
      </p>

      <FcVoicemail className="text-3xl mx-auto" />
    </div>
  );
};

export default Footer;
