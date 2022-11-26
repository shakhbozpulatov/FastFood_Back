const { orderModel } = require("../model/Order");

class Order {
  // Get All Orders
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProducts.id", "pName pImage pPrice")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Create New Order
  async createOrder(req, res) {
    try {
      let newOrder = new orderModel({
        allProducts: req.body.allProducts,
        queue_number: req.body.queue_number,
        quantity: req.body.quantity,
        phone: req.body.phone,
      });

      await newOrder
        .save()
        .then(() => {
          return res.status(201).json({
            msg: "Order created successfully",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            msg: `Oops! Order is not created! Error: ${err}`,
          });
        });
    } catch (error) {}
  }

  // Change Order Status
  async updateOrder(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ msg: "All filled must be required" });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.status(200).json({
          success: "Order updated successfully",
        });
      });
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
