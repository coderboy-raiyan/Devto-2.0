/* eslint-disable no-use-before-define */
import connectDb from "../../../../connectDb/connectDb";
import allBlogs from "../../../../models/blogSchema";

connectDb();

export default async function allblogs(req, res) {
    try {
        switch (req.method) {
            case "GET":
                await getAllBlogs(req, res);
                break;

            default:
                await getAllBlogs(req, res);
                break;
        }
    } catch (err) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// this endpoint is used for load all blogs
const getAllBlogs = async (req, res) => {
    try {
        const count = await allBlogs.countDocuments();
        const data = await allBlogs.find().sort({ time: -1 });
        res.send({ blogs: data, size: count });
    } catch (err) {
        res.status(500).json({ message: "There is a server side error", err });
    }
};
