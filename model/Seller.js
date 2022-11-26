const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const SellerSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model("Seller", SellerSchema);

function validateSeller(seller) {
  const schema = Joi.object({
    name: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    orders: Joi.array(),
  });

  return schema.validate(seller);
}

exports.Seller = Seller;
exports.validate = validateSeller;
