import { Grid } from "@mui/material";
import React from "react";
import Achievements from "./Achievements";
import MonthlyOverview from "./MonthlyOverview";
import OrdersTable from "./OrdersTable";
import ProductsTableView from "../view/ProductTableView";

const AdminDashboard = () => {
  return (
    <div className="p-10 ">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <div className="shadow-lg shadow-gray-600">
            <Achievements />
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="shadow-lg shadow-gray-600">
            <MonthlyOverview />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <ProductsTableView />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="shadow-lg shadow-gray-600">
            <OrdersTable />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
