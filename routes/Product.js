const express = require("express");
const router = express.Router();
const productsController = require("../controller/Product");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-all-products", productsController.getAllProduct);
router.post(
  "/create-product",
  upload.single("productImage"),
  productsController.createProduct
);

module.exports = router;
