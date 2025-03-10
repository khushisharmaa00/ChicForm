const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");
const productService = require("../services/product.service.js");

const createProduct = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    const product = await productService.createProduct(req.body);
    console.log("Product created:", product);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.deleteProduct(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.updateProduct(productId, req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.findProductById(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const createMultipleProduct = async (req, res) => {
  try {
    const products = await productService.createMultipleProduct(req.body);
    return res.status(201).send({ message: "Products Created Successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const searchProducts = async (req, res) => {
  const query = req.query.query;
  console.log("Search Query:", query); // Debugging
  try {
    // Find all categories that match the query at any level
    const matchingCategories = await Category.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Match top-level category
        { "parentCategory.name": { $regex: query, $options: "i" } }, // Match second-level category
        {
          "parentCategory.parentCategory.name": {
            $regex: query,
            $options: "i",
          },
        }, // Match third-level category
      ],
    })
      .populate("parentCategory") // Populate parentCategory
      .populate("parentCategory.parentCategory"); // Populate nested parentCategory

    console.log("Matching Categories:", matchingCategories); // Debugging

    // Extract category IDs from matching categories
    const categoryIds = matchingCategories.map((category) => category._id);
    console.log("Category IDs:", categoryIds); // Debugging

    // If no matching categories, return empty array
    if (categoryIds.length === 0) {
      console.log("No matching categories found for query:", query);
      return res.status(200).json([]);
    }

    // Find products that match the query in title or belong to matching categories
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search by title
        { category: { $in: categoryIds } }, // Match products in any of the matching categories
      ],
    }).populate("category"); // Populate category details

    console.log("Products Found:", products); // Debugging

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error); // Debugging
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProduct,
  findProductById,
  searchProducts,
};
