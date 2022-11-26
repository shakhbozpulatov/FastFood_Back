const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ProductSchema = new Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    pQuantity: {
      type: Number,
      required: true,
    },
    pImage: {
      data: Buffer,
      contentType: String,
    },
    pPrice: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    pCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);

exports.productModel = productModel;
