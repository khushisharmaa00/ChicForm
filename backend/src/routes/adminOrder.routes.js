// const express = require("express");
// const router = express.Router();

// // const orderController = require("../controller/adminOrder.controller.js");
// const authenticate = require("../middleware/authenticate.js");
// const { getAllOrders } = require("../controller/adminOrder.controller.js");

// router.get("/", authenticate, getAllOrders);
// router.put(
//   "/:orderId/confirmed",
//   authenticate,
//   orderController.confirmedOrders
// );
// router.put("/:orderId/ship", authenticate, orderController.shipOrders);
// router.put("/:orderId/deliver", authenticate, orderController.deliverOrders);
// router.put("/:orderId/cancel", authenticate, orderController.cancelledOrders);
// router.delete("/:orderId/delete", authenticate, orderController.deleteOrder);

// module.exports = router;
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");
const adminOrderController = require("../controller/adminOrder.controller.js");

// Define routes
router.get("/", authenticate, adminOrderController.getAllOrders);
router.put(
  "/:orderId/confirmed",
  authenticate,
  adminOrderController.confirmedOrders
);
router.put("/:orderId/ship", authenticate, adminOrderController.shipOrders);
router.put(
  "/:orderId/deliver",
  authenticate,
  adminOrderController.deliverOrders
);
router.put(
  "/:orderId/cancel",
  authenticate,
  adminOrderController.cancelledOrders
);
router.delete(
  "/:orderId/delete",
  authenticate,
  adminOrderController.deleteOrder
);

module.exports = router;
