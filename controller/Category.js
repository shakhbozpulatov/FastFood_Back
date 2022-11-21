const { Category, validate } = require("../model/Category");
const fs = require("fs");

const ADD_CATEGORY = (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newCategory = new Category({
      name: req.body.name,
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });

    newCategory
      .save()
      .then(() => {
        return res.status(201).json({
          msg: "Category created successfully!",
        });
      })
      .catch((err) => {
        res.status(400).send(`Oops! Category is not saved. Error: ${err}`);
      });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  ADD_CATEGORY,
};
