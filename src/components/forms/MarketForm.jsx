import { Box, Grid, Typography } from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import MarketValidationSchema from "validationSchemas/marketValidationSchema.js";

const MarketForm = ({
  isCreate,
  isUpdate,
  existingMarket,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onCancelClick,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
  onDeleteSubmitFunction,
}) => {
  const [marketName, setMarketName] = useState(
    existingMarket ? existingMarket.MarketName : ""
  );
  const [address, setAddress] = useState(
    existingMarket ? existingMarket.Address : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(MarketValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  useEffect(() => {
    if (existingMarket) {
      setMarketName(existingMarket.MarketName);
      setAddress(existingMarket.Address);

      let defaults = {
        marketName: marketName,
        address: address,
      };

      reset(defaults);
    }
  }, [existingMarket, reset]);

  return (
    <Box
      p={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 } }}
    >
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Mercado
        </Typography>
        <Grid container sx={{ width: "100%" }} direction={"column"}>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ px: 1, pt: 1, width: "100%" }}
          >
            <FormField
              required={true}
              type="text"
              label={"Nombre del Mercado"}
              name={"marketName"}
              value={marketName}
              onChange={(event) => setMarketName(event.target.value)}
              error={!!errors["marketName"]}
              helperText={getHelperText("marketName")}
              inputProps={register("marketName")}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ px: 1, pt: 1, width: "100%" }}
          >
            <FormField
              required={true}
              type="text"
              label={"Dirección"}
              name={"address"}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error={!!errors["address"]}
              helperText={getHelperText("address")}
              inputProps={register("address")}
            />
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        isLastStep
        isSignUp
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={handleShowErrorAlert}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={handleShowCreatedAlert}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={handleShowUpdatedAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onCreateSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateSubmitFunction)}
        onDeleteClickSubmit={handleSubmit(onDeleteSubmitFunction)}
      />
    </Box>
  );
};

MarketForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingMarket: PropTypes.object,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  onDeleteSubmitFunction: PropTypes.func,
};

MarketForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingMarket: null,
};

export default MarketForm;
