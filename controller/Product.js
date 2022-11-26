const { productModel } = require("../model/Product");
const fs = require("fs");

class Product {
  async getAllProduct(req, res) {
    try {
      let Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      if (Products) {
        return res.json({ Products });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createProduct(req, res) {
    try {
      let { pName, pQuantity, pPrice, pCategory } = req.body;
      let pImage;
      let filePath;

      // Validation
      try {
        if (!pName | !pQuantity | !pPrice | !pCategory) {
          if (req.file) {
            pImage = req.file.filename;
            filePath = `./public/uploads/products/${pImage}`;
            fs.unlink(filePath, (err) => {
              if (err) {
                return res.json({ error: err });
              }
            });
            return res
              .status(400)
              .json({ error: "All filled must be required" });
          }
          return res.json({ msg: "All filled must be required" });
        }
        if (!req.file) {
          pImage = req.file.filename;
          filePath = `./public/uploads/products/${pImage}`;
          fs.unlink(filePath, (err) => {
            if (err) {
              return res.json({ error: err });
            }
          });
          return res.status(400).json({ error: "All filled must be required" });
        }
      } catch (error) {
        return res.json({
          error: `${error}`,
          msg: "All filled must be required",
        });
      }

      let newProduct = new productModel({
        pName,
        pQuantity,
        pImage: {
          data: fs.readFileSync(
            "./public/uploads/products/" + req.file.filename
          ),
          contentType: "image/png",
        },
        pPrice,
        pCategory,
      });

      newProduct
        .save()
        .then(() => {
          return res.status(201).json({
            success: "Product created successfully!",
          });
        })
        .catch((err) => {
          res.status(400).send(`Oops!. Product is not saved. Error: ${err}`);
        });
    } catch (error) {}
  }
}

const productsController = new Product();
module.exports = productsController;
