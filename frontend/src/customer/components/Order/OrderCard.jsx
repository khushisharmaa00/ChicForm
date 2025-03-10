import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  if (!order || !order.orderItems || order.orderItems.length === 0) {
    return <div>No order items available.</div>;
  }

  return (
    <div
      onClick={() => navigate(`/account/order/${order._id}`)}
      className="p-5 shadow-md shadow-gray-950 hover:shadow-2xl border"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex cursor-pointer ">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src={item.product?.imageUrl}
                alt={item.product?.title}
              />
              <div className="ml-5 space-y-2">
                <p>{item.product?.title}</p>
                <p className="opacity-50 text-xs font-semibold">
                  <span>Quantity: {item.quantity}</span>
                  <span> Size : {item.size}</span>
                </p>
                <p className="opacity-50 text-xs font-semibold">
                  Color : {item.product?.color}
                </p>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={2}>
          {" "}
          <p>₹ {order.totalDiscountedPrice} </p>
        </Grid>
        <Grid item xs={4}>
          {order.orderStatus === "DELIVERED" ? (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>
                  Delivered on {new Date(order.deliveryDate).toDateString()}
                </span>
              </p>
              <p className="text-xs">Your Item has been Delivered</p>
            </div>
          ) : order.orderStatus === "CANCELLED" ? (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-red-600 mr-2 text-sm"
                />
                <span>Cancelled</span>
              </p>
              <p className="text-xs">Your order has been cancelled</p>
            </div>
          ) : (
            <p>
              <span>
                Expected Delivery On{" "}
                {order.expectedDeliveryDate
                  ? new Date(order.expectedDeliveryDate).toDateString()
                  : "Not available"}
              </span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
