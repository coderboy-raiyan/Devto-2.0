import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  bannerImg: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  richText: [],
});

export default mongoose.models.blog || mongoose.model("blog", blogSchema);
