const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

async function createProduct(reqData) {
  try {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        level: 1,
      });
      await topLevel.save();
    }
    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
      await secondLevel.save();
    }
    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
      await thirdLevel.save();
    }

    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discountPercent: reqData.discountPercent,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      sizes: reqData.sizes,
      quantity: reqData.quantity,
      category: thirdLevel._id,
    });
    return await product.save();
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw new Error(error.message);
  }
}
async function deleteProduct(productId) {
  const product = await findProductById(productId);
  await Product.findByIdAndDelete(productId);
  return "Product Deleted Successfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData, { new: true });
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not found with id " + id);
  }
  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber = 1,
    pageSize = 10,
  } = reqQuery;

  // pageNumber = Math.max(1, pageNumber);
  // pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  pageNumber = Math.max(1, pageNumber);
  pageSize = pageSize || 10;
  let query = Product.find().populate("category");
  if (category) {
    const existCategory = await Category.findOne({
      name: category,
    });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }
  if (sizes) {
    const sizesSet = new Set(sizes);
    query.query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }
  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  console.log("Products Found:", products);
  const totalPages = Math.ceil(totalProducts / pageSize);
  return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
