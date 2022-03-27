/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../connectDb/connectDb";
import allBlogs from "../../../models/blogSchema";

connectDb();

export default async function blogs(req, res) {
    try {
        switch (req.method) {
            case "GET":
                await getPaginationBlogs(req, res);
                break;

            case "POST":
                await postBlog(req, res);
                break;

            default:
                await getPaginationBlogs(req, res);
                break;
        }
    } catch (err) {
        res.status(500).json({ message: "There is a server side error" });
    }
}

// this works for pagination blogs
const getPaginationBlogs = async (req, res) => {
    try {
        const loadCount = Number(req.query.size);
        if (loadCount) {
            const count = await allBlogs.countDocuments();
            const data = await allBlogs.find().sort({ time: -1 }).skip(loadCount).limit(3);
            res.send({ blogs: data, size: count });
        } else {
            const count = await allBlogs.countDocuments();
            const data = await allBlogs.find().sort({ time: -1 }).limit(3);
            res.send({ blogs: data, size: count });
        }
    } catch (err) {
        res.status(500).json({ message: "There is a server side error", err });
    }
};

const postBlog = async (req, res) => {
    try {
        const result = await new allBlogs(req.body).save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "There is a server side error", err });
    }
};
