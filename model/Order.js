const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const OrderSchema = new Schema({
  time: {
    type: Date(),
  },
  queue_number: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    time: Joi.date(),
    queue_number: Joi.number().required(),
    orderStatus: Joi.string().required(),
    seller: Joi.objectId(),
    product: Joi.array(),
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
