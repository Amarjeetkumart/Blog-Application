const { Schema, model } = require("mongoose");
//creating a schema for the comment
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
//creating a model for the comment
const Comment = model("comment", commentSchema);
//exporting the model for the comment
module.exports = Comment;