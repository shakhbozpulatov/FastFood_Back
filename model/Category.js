const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

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
      ref: "Product",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
