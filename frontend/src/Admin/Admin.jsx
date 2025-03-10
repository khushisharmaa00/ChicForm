import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProductsTable from "./components/ProductsTable";
import CreateProductForm from "./components/CreateProductForm";
import OrdersTable from "./components/OrdersTable";
import CustomerTable from "./components/CustomerTable";
import AdminDashboard from "./components/Dashboard";
const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <DashboardIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
  {
    name: "AddProduct",
    path: "/admin/products/create",
    icon: <DashboardIcon />,
  },
  //   { name: "", path: "" },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "#ffffff",
        height: "100%",
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <EmailIcon />} */}
                {item.icon}
              </ListItemIcon>
              <ListItemText>{item.name} </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <EmailIcon />} */}
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemIcon>Account</ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className=" relative flex h-[100vh]  ">
      <CssBaseline />
      <div className=" shadow-lg shadow-gray-600 w-[15%]  h-full fixed top-0">
        {drawer}
      </div>
      {/* <Box className="adminContainer" component={"main"} sx={{ flexGrow: 1 }}> */}
      <div className="w-[85%] h-full ml-[15%]">
        <Routes>
          <Route path="/" element={<AdminDashboard />}></Route>
          <Route
            path="/products/create"
            element={<CreateProductForm />}
          ></Route>
          <Route path="/products" element={<ProductsTable />}></Route>
          <Route path="/orders" element={<OrdersTable />}></Route>
          <Route path="/customers" element={<CustomerTable />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
