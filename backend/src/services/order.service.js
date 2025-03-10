const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("./cart.service.js");

async function createOrder(user, shipAddress) {
  try {
    let address;
    if (shipAddress._id) {
      address = await Address.findById(shipAddress._id);
    } else {
      address = new Address(shipAddress);
      address.user = user._id;
      await address.save();
      user.address.push(address._id);
      await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        userId: item.userId,
        discountedPrice: item.discountedPrice,
      });
      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user: user._id,
      orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      totalItem: cart.totalItem,
      shippingAddress: address._id,
    });
    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw new Error(error.message);
  }
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  return await order.save();
}
async function confirmedOrders(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
}
async function shipOrders(orderId) {
  const order = await findOrderById(orderId);
  order.expectedDeliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  order.orderStatus = "SHIPPED";
  return await order.save();
}
async function deliverOrders(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  order.deliveryDate = new Date();
  return await order.save();
}
async function cancelledOrders(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "products",
      },
    })
    .populate("shippingAddress");

  return order;
}

async function usersOrdersHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: { $in: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"] },
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress")
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrders,
  shipOrders,
  deliverOrders,
  cancelledOrders,
  deleteOrder,
  findOrderById,
  usersOrdersHistory,
  getAllOrders,
};
