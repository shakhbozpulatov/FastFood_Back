const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  remain_quantity: {
    type: Number,
  },
  picture: {
    type: Schema.Types.Buffer,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  category_name: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

const Product = mongoose.model("Product", ProductSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    remain_quantity: Joi.number(),
    price: Joi.number().precision(3).required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
