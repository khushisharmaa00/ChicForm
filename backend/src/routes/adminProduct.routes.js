// const express = require("express");
// const router = express.Router();

// const productController = require("../controller/product.controller.js");
// const authenticate = require("../middleware/authenticate.js");

// router.post("/", authenticate, productController.createProduct);

// router.post("/creates", authenticate, productController.createMultipleProduct);

// router.delete("/:id/delete", authenticate, productController.deleteProduct);

// router.put("/:id", authenticate, productController.updateProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");
const adminProductController = require("../controller/product.controller.js");

// Log the imported controller methods

// Define routes
router.get("/", authenticate, adminProductController.getAllProducts);

router.post("/", authenticate, adminProductController.createProduct);
router.post(
  "/creates",
  authenticate,
  adminProductController.createMultipleProduct
);
router.delete(
  "/:id/delete",
  authenticate,
  adminProductController.deleteProduct
);
router.put("/:id", authenticate, adminProductController.updateProduct);

module.exports = router;
