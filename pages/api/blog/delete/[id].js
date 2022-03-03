import blogs from "../../../../models/blogSchema";
import connectDb from "./../../../../connectDb/connectDb";
connectDb();

const deleteBlog = async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteABlog(req, res);
      break;

    default:
      break;
  }
};

const deleteABlog = async (req, res) => {
  try {
    const blogId = req.query.id;
    const result = await blogs.findByIdAndDelete({ _id: blogId });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "There is a server side error" });
  }
};

export default deleteBlog;
