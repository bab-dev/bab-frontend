import React from "react";
import PropTypes from "prop-types";
import {
  useMediaQuery,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";

const StepperComponent = ({ activeStep, steps, content }) => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid container>
      <Grid item width={"100%"} px={2}>
        <Stepper
          activeStep={activeStep}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
        >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
              {isSmallScreen && <StepContent>{content} </StepContent>}
            </Step>
          ))}
        </Stepper>
      </Grid>

      {!isSmallScreen && (
        <Grid container pt={2}>
          {content}
        </Grid>
      )}
    </Grid>
  );
};

StepperComponent.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
  content: PropTypes.any,
};

export default StepperComponent;
