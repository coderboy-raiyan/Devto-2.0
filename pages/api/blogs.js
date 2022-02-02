// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../connectDb/connectDb";
import allBlogs from "../../models/blogSchema";
connectDb();

export default function blogs(req, res) {
  allBlogs
    .find()
    .then((all_blogs) => {
      res.status(200).json(all_blogs);
    })
    .catch((err) => {
      console.log(err);
    });
}
