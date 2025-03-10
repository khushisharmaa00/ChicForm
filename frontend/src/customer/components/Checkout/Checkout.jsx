import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = ["Login", " Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const step = parseInt(querySearch.get("step")) || 0;
  const orderId = querySearch.get("order_id");

  const [activeStep, setActiveStep] = React.useState(step);

  //   const handleNext = () => {
  //     const newStep = activeStep + 1;
  //     setActiveStep(newStep);
  //     window.history.pushState(null, "", `?step=${newStep}`); // ✅ Update URL
  //   };

  const handleBack = () => {
    const newStep = activeStep - 1;
    setActiveStep(newStep);
    window.history.pushState(null, "", `?step=${newStep}`);
  };

  return (
    <div className="px-10 lg:px-20">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>

              {/* <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </Box>
            <div className="mt-10">
              {step === 2 ? (
                <DeliveryAddressForm />
              ) : (
                <OrderSummary orderId={orderId} />
              )}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
