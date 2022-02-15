import allBlogs from "../../../models/blogSchema";
import connectDb from "./../../../connectDb/connectDb";
connectDb();

const blog = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        await getAPost(req, res);
        break;

      default:
        getAPost(req, res);
        break;
    }
  } catch (err) {
    res.status(500).json({ message: "There is a server side error" });
  }
};

const getAPost = async (req, res) => {
  try {
    const slug = req.query.slug;
    const result = await allBlogs.findOne({ slug: slug });
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "There is a server side" });
  }
};

export default blog;
