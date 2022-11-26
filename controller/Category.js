const { categoryModel } = require("../model/Category");
const fs = require("fs");
const { toTitleCase } = require("../config/function");

class Category {
  // Get All Categories
  async getAllCategry(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (error) {
      return res.status(400).json({
        msg: `Oops! Not get all categories. Error: ${error}`,
      });
    }
  }

  // Create New Category
  async createCategory(req, res) {
    let { cName } = req.body;
    let cImage;
    let filePath;
    try {
      if (!cName) {
        if (req.file) {
          cImage = req.file.filename;
          filePath = `./public/uploads/categories/${cImage}`;
          fs.unlink(filePath, (err) => {
            if (err) {
              return res.json({ error: err });
            }
          });
          return res.status(400).json({ error: "All filled must be required" });
        }
        return res.status(400).json({ error: "All filled must be required" });
      }
      if (!req.file) {
        cImage = req.file.filename;
        filePath = `./public/uploads/categories/${cImage}`;
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
    cName = toTitleCase(cName);
    try {
      let checkCategoryExists = await categoryModel.findOne({
        cName: cName,
      });
      if (checkCategoryExists) {
        cImage = req.file.filename;
        filePath = `./public/uploads/categories/${cImage}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(`err ${err}`);
          }
          return res.json({ error: "Category already exists" });
        });
      } else {
        let newCategory = new categoryModel({
          cName,
          cImage: {
            data: fs.readFileSync(
              "./public/uploads/categories/" + req.file.filename
            ),
            contentType: "image/png",
          },
        });
        await newCategory.save((err) => {
          if (!err) {
            return res.status(201).json({
              success: "Category created successfully",
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    // const newCategory = new categoryModel({
    //   cName: req.body.cName,
    //   cImage: {
    //     data: fs.readFileSync("uploads/" + req.file.filename),
    //     contentType: "image/png",
    //   },
    // });

    //   newCategory
    //     .save()
    //     .then(() => {
    //       return res.status(201).json({
    //         msg: "Category created successfully!",
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(400).send(`Oops! Category is not saved. Error: ${err}`);
    //     });
    // } catch (error) {
    //   res.status(400).json({
    //     message: error.message,
    //   });
    // }
  }
}

const categoryController = new Category();
module.exports = categoryController;
