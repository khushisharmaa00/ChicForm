import React, { useRef, useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();
  const [address, setAddress] = useState(null);
  const [isAddressSaved, setIsAddresssSaved] = useState(false);
  const { auth } = useSelector((store) => store);
  console.log("auth", auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(address);
    const data = new FormData(e.target);
    const newAddress = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip-code"),
      mobile: data.get("mobile"),
    };
    setAddress(newAddress);
    setIsAddresssSaved(true);

    // const orderData = { address: newAddress, navigate };
    // dispatch(createOrder(orderData));
    console.log("address", newAddress);
  };
  const handleNavigate = () => {
    if (isAddressSaved) {
      const orderData = { address, navigate };
      dispatch(createOrder(orderData));
    }
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b cursor-pointer">
            {/* <AddressCard address={address} /> */}
            {/* {auth.user?.address.map((item) => (
              <AddressCard address={item} />
            ))} */}
            {isAddressSaved && <AddressCard address={address} />}
            <Button
              // onClick={(e) => {
              //   e.preventDefault();
              //   handleSubmit(e);
              // }}
              // onClick={() => document.getElementById("deliveryForm").submit()}
              // onClick={(e) =>
              //   formRef.current.dispatchEvent(
              //     new Event("submit", { cancelable: true })
              //   )
              // // }
              // onClick={(e) => handleSubmit(e)}
              onClick={handleNavigate}
              sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
              // type="submit"

              size="large"
              variant="contained"
            >
              Proceed To Payment
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label=" street Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip-code"
                    name="zip-code"
                    label="Zip-code/Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="mobile"
                    name="mobile"
                    label="mobile Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    // onClick={handleSubmit}
                    sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    DELIVER HERE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
