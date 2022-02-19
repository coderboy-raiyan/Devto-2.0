import likes from "../../../models/likeSchema";
import connectDb from "./../../../connectDb/connectDb";
connectDb();

const blog = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        await getTheAllLikes(req, res);
        break;

      default:
        break;
    }
  } catch (e) {
    res.status(500).json({ message: "There is a sever side error" });
  }
};

// get the all likes for specific blog
const getTheAllLikes = async (req, res) => {
  try {
    const blogId = req.query.id;
    const result = await likes.find({ blogId: blogId });
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: "There is a sever side", e });
  }
};

export default blog;
