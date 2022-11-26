const express = require("express");
const router = express.Router();
const categoryController = require("../controller/Category");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-all-category", categoryController.getAllCategry);
router.post(
  "/create-category",
  upload.single("cImage"),
  categoryController.createCategory
);

module.exports = router;
