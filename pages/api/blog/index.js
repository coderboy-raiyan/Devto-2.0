import likes from "../../../models/likeSchema";
import connectDb from "./../../../connectDb/connectDb";
connectDb();

const blog = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        await getTheAllLikes(req, res);
        break;

      case "POST":
        await addLikeToAPost(req, res);
        break;

      default:
        await getTheAllLikes(req, res);
        break;
    }
  } catch (e) {
    res.status(500).json({ message: "There is a sever side error" });
  }
};

// get all the likes
const getTheAllLikes = async (req, res) => {
  try {
    const result = await likes.find({});
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: "There is a server side" });
  }
};

// add likes to the blogs
const addLikeToAPost = async (req, res) => {
  try {
    const result = await new likes(req.body).save((err, data) => {
      if (err) {
        res.status(500).json({ message: "There is a sever side error", err });
      } else {
        res.send(data);
      }
    });
  } catch (err) {
    res.status(500).json({ message: "There is a server side" });
  }
};

export default blog;
