import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: [true, "Please provide movieName"],
  },
  comments: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

const Comments = mongoose.models.Comments || mongoose.model("Comments", commentsSchema);


export default Comments;