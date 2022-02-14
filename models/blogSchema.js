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
  userEmail: {
    type: String,
  },
  userImg: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  editorState: {},
});

export default mongoose.models.blog || mongoose.model("blog", blogSchema);
