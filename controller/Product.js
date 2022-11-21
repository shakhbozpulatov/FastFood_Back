const { Product, validate } = require("../model/Product");
const { Category } = require("../model/Category");
const fs = require("fs");

const ADD_PRODUCT = (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity,
      remain_quantity: req.body.remain_quantity,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
      price: req.body.price,
      category_name: req.body.category_name,
    });

    newProduct
      .save()
      .then(() => {
        Category.findOne(
          { name: newProduct.category_name },
          (err, category) => {
            if (category) {
              category.product.push(newProduct);
              category.save();
              res.status(201).json({
                msg: "Product created successfullu",
              });
            }
          }
        );
        // return res.status(201).json({
        //   msg: "Product created successfully!",
        // });
      })
      .catch((err) => {
        res.status(400).send(`Oops!. Product is not saved. Error: ${err}`);
      });
  } catch (error) {}
};

module.exports = {
  ADD_PRODUCT,
};
