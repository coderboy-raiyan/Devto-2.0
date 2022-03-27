import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
        required: true,
    },
});

export default mongoose.models.like || mongoose.model("like", likeSchema);
