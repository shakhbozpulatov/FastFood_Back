const express = require("express");
const router = express.Router();
const category_controller = require("../controller/Category");
const upload = require("../middleware/uploadFile")

router.post("/addnew", upload.single("categoryImage"), category_controller.ADD_CATEGORY);


module.exports = router;