import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrdersByUserId } from "../../../State/Order/Action";

const orderStatus = [
  { Label: "Shipped", value: "shipped" },
  { Label: "Delivered", value: "delivered" },
  { Label: "Cancelled", value: "cancelled" },
  { Label: "Confirmed", value: "confirmed" },
];
const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { order } = useSelector((store) => store);

  const { auth } = useSelector((store) => store);
  const [selectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    if (auth.user) {
      dispatch(getOrdersByUserId(auth.user._id)); // Fetch all orders for the user
    }
  }, [auth.user, dispatch]);
  const handleFilterChange = (value) => {
    if (selectedFilters.includes(value)) {
      // If the filter is already selected, remove it
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    } else {
      // If the filter is not selected, add it
      setSelectedFilters([...selectedFilters, value]);
    }
  };
  const filteredOrders = order.orders?.filter((order) => {
    if (selectedFilters.length === 0) return true; // No filters selected, show all orders
    return selectedFilters.includes(order.orderStatus.toLowerCase());
  });
  return (
    <div className=" px-5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>

              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    value={option.value}
                    type="checkbox"
                    checked={selectedFilters.includes(option.value)}
                    onChange={() => handleFilterChange(option.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.Label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-5">
            {/* {order.orders && order.orders.length > 0 ? ( // Access `order.orders`
              order.orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <div>No orders found.</div>
            )} */}
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            ) : (
              <div>No orders found.</div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
