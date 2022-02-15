// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import allBlogs from "../../../models/blogSchema";
import connectDb from "./../../../connectDb/connectDb";
connectDb();

export default async function blogs(req, res) {
  try {
    switch (req.method) {
      case "GET":
        await getAllBlogs(req, res);
        break;

      case "POST":
        await postBlog(req, res);
        break;

      default:
        await getAllBlogs(req, res);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: "There is a server side error" });
  }
}

const getAllBlogs = async (req, res) => {
  allBlogs
    .find()
    .sort("slug : 1")
    .then((all_blogs) => {
      res.status(200).json(all_blogs);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postBlog = async (req, res) => {
  try {
    const result = await new allBlogs(req.body).save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "There is a server side error", err });
  }
};
