import blogs from "../../../../models/blogSchema";
import connectDb from "./../../../../connectDb/connectDb";
connectDb();

const edit = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getTheEditBlog(req, res);
      break;

    default:
      getTheEditBlog(req, res);
      break;
  }
};

// get the blog wants to edit
const getTheEditBlog = async (req, res) => {
  try {
    const slug = req.query.slug;
    const result = await blogs.findOne({ slug: slug });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "There is a server side", err });
  }
};

export default edit;
