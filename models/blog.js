const { Schema, model } = require("mongoose");
const { schema } = require("./user");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      requered: true,
    },
    body: {
      type: String,
      requered: true,
    },
    coverImageURL: {
      type: String,
      requered: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);
module.exports = Blog;
