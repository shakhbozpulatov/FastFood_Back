const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  product: [
    {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
  ]
});

const Category = mongoose.model("Category", CategorySchema);

exports.Category = Category;
