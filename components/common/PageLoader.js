import React from "react";
import CircleLoader from "../Custom/CircleLoader";

function PageLoader() {
    return (
        <div className="flex justify-center items-center h-screen flex-col bg-[#F3F4F6]">
            <div>
                <img
                    className="w-full"
                    src="https://i.postimg.cc/4xBRpHZy/resized-logo-UQww2so-Ku-Usja-OGNB38o-1.png"
                    alt=""
                />
            </div>
            <div>
                <CircleLoader className="py-4" />
            </div>
        </div>
    );
}

export default PageLoader;
