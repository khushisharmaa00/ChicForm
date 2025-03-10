import {
  Avatar,
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("lengha_choli");
  console.log("products --", products);
  console.log("Products in table:", products.products);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const fetchProducts = (category) => {
    const data = {
      category: category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 56,
      stock: "",
    };
    dispatch(findProducts(data));
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);
  console.log("Products in table:", products.products);
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
          title="All Products"
          sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}
          action={
            <FormControl
              variant="outlined"
              sx={{
                minWidth: 200,
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="women_dress">Women Dresses</MenuItem>
                <MenuItem value="women_jeans">Women Jeans</MenuItem>
                <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
                <MenuItem value="men_jeans">Men Jeans</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
              </Select>
            </FormControl>
          }
        />

        <TableContainer
          component={Paper}
          sx={{
            background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
            color: "white",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Title
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={product.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }} scope="row">
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
                  <TableCell align="left">
                    <Button
                      onClick={() => handleProductDelete(product._id)}
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      Delete
                    </Button>
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

export default ProductsTable;
