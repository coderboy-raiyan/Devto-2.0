import React from "react";
import { FcVoicemail } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="space-y-4 bg-gray-200 py-20 text-center text-[14px] font-light">
      <p className="">
        <span className="cursor-pointer font-semibold text-blue-600 hover:underline">
          DEV Community
        </span>{" "}
        — A constructive and inclusive social network for software developers.
        With you every step of your journey.
      </p>
      <p className="mx-auto w-2/4">
        Built on Forem — the open source software that powers DEV and other
        inclusive communities. Made with love and Ruby on Rails. DEV Community ©
        2016 - 2022.
      </p>

      <FcVoicemail className="mx-auto text-3xl" />
    </div>
  );
};

export default Footer;
