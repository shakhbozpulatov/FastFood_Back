const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    cName: {
      type: String,
      required: true,
    },
    cImage: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Category", CategorySchema);

exports.categoryModel = categoryModel;
