const orderService = require("../services/order.service.js");

const createOrder = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await orderService.createOrder(user, req.body);
    return res
      .status(201)
      .send({ message: "Order created successfully", order: createdOrder });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const findOrderById = async (req, res) => {
  const user = await req.user;
  try {
    let order = await orderService.findOrderById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const orderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let orders = await orderService.orderHistory(user._id);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await orderService.usersOrdersHistory(userId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.cancelOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory,
  getOrdersByUserId,
  cancelOrder,
};
