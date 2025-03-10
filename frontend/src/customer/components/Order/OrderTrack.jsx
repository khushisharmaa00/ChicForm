import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];
const OrderTrack = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((Label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {Label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTrack;
