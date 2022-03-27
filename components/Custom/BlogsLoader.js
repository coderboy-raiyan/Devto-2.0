/* eslint-disable import/no-extraneous-dependencies */
import { css } from "@emotion/react";
import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function BlogsLoader() {
    const [color, setColor] = useState("#366CD7");
    return (
        <div className="flex justify-center my-4">
            <ScaleLoader color={color} css={override} size={70} />
        </div>
    );
}

export default BlogsLoader;
