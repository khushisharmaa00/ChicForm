import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";

const ProductsTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  useEffect(() => {
    const data = {
      category: "lengha_choli",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 25,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch]);
  return (
    <div className="p-5 ">
      <Card
        sx={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          color: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        className="mt-2"
      >
        <CardHeader
          title="Recent Products"
          sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1e293b" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="left"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="left"
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="left"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="left"
                >
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.products.slice(0, 10).map((product) => (
                <TableRow
                  key={product._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: "rgba(1, 15, 37, 0.7)",
                  }}
                >
                  <TableCell align="left">
                    <Avatar src={product.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left" scope="row" sx={{ color: "white" }}>
                    {product.title}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {product.category?.name}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {product.price}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {product.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductsTableView;
