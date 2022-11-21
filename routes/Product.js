const express = require("express");
const router = express.Router();
const product_controller = require("../controller/Product");
const upload = require("../middleware/uploadFile")

router.post("/addnew", upload.single("productImage"), product_controller.ADD_PRODUCT);

module.exports = router;