const express = require("express");
const router = express.Router();
const ordersController = require("../controller/Order");

router.get("/get-all-orders", ordersController.getAllOrders);
router.post("/create-order", ordersController.createOrder);
router.post("/update-order", ordersController.updateOrder);

module.exports = router;
