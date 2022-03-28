import axios from "axios";
import { useEffect, useState } from "react";

const useUploadImage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [finalImg, setFinalImg] = useState("");
    const [imgLoading, setImgLoading] = useState(true);

    // send the image to imageBb and get the url
    useEffect(() => {
        if (selectedImg) {
            const formData = new FormData();
            formData.append("image", selectedImg);
            setImgLoading(true);
            axios({
                method: "post",
                url: "https://api.imgbb.com/1/upload?key=b8e0c953a6b98e5a101ba8a93b2ceb77",
                data: formData,
            })
                .then((data) => setFinalImg(data.data.data.url))
                .finally(() => {
                    setImgLoading(false);
                });
        }
    }, [selectedImg]);

    const uploadImg = (e) => {
        setSelectedImg(e.target.files[0]);
    };

    const removeImg = (e) => {
        setSelectedImg(null);
        setFinalImg("");
    };

    return {
        uploadImg,
        removeImg,
        setFinalImg,
        setSelectedImg,
        finalImg,
        imgLoading,
        selectedImg,
    };
};

export default useUploadImage;
