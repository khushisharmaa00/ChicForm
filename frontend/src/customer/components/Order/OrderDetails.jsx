import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTrack from "./OrderTrack";
import { Box, Button, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { cancelOrder, getOrderById } from "../../../State/Order/Action";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.order);
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);
  console.log("Order Details:", order);
  const handleCancelOrder = () => {
    dispatch(cancelOrder(order._id));
  };
  if (!order || !order.orderItems || order.orderItems.length === 0) {
    return <div>No order items available.</div>;
  }
  return (
    <div className="px:5 lg:px-20  ">
      <div>
        <h1 className="font-bold text-xl py-10">Delivery Address</h1>
        <AddressCard address={order.shippingAddress} />
      </div>
      <div className="py-20">
        {/* <OrderTrack activeStep={3} /> */}
        <OrderTrack activeStep={getActiveStep(order.orderStatus)} />
      </div>
      <Grid className="space-y-5" container>
        {order.orderItems.map((item) => (
          <Grid
            key={item._id}
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product?.imageUrl}
                  alt={item.product?.title}
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">{item.product?.title}</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    {" "}
                    <span>Color: {item.product.color}</span>{" "}
                    <span>Size:{item.size}</span>
                  </p>
                  <p>Seller: {item.product?.brand}</p>
                  <p>₹{item.discountedPrice}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <Box
                sx={{ color: deepPurple[500] }}
                onClick={() => navigate(`/review/${item.product._id}`)}
              >
                <StarBorderIcon
                  sx={{ fontSize: "2rem" }}
                  className="px-2 text-2xl"
                />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {order.orderStatus !== "DELIVERED" &&
        order.orderStatus !== "CANCELLED" && (
          <div className="mt-10">
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          </div>
        )}
    </div>
  );
};
const getActiveStep = (orderStatus) => {
  switch (orderStatus) {
    case "PLACED":
      return 0;
    case "CONFIRMED":
      return 1;
    case "SHIPPED":
      return 2;
    case "OUT_FOR_DELIVERY":
      return 3;
    case "DELIVERED":
      return 4;
    case "CANCELLED":
      return -1;
    default:
      return 0;
  }
};
export default OrderDetails;
