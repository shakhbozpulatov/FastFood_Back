const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const OrderSchema = new Schema(
  {
    allProducts: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    queue_number: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered"],
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", OrderSchema);

exports.orderModel = orderModel;