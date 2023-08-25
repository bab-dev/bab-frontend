import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import MarketSellerValidationSchema from "validationSchemas/marketSellerValidationSchema.js";

const MarketSellerForm = ({
  isCreate,
  isUpdate,
  existingMarketSeller,
  showErrorAlert,
  showCreatedAlert,
  showUpdatedAlert,
  closeDialogs,
  onCancelClick,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
}) => {
  const state = useSelector((state) => state);

  const [name, setName] = useState(
    existingMarketSeller ? existingMarketSeller.Name : ""
  );
  const [lastName, setLastName] = useState(
    existingMarketSeller ? existingMarketSeller.LastName : ""
  );
  const [marketName, setMarketName] = useState(
    existingMarketSeller ? existingMarketSeller.MarketName : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingMarketSeller ? existingMarketSeller.PhoneNumber : ""
  );
  const [idProductCategory, setIdProductCategory] = useState(
    existingMarketSeller ? existingMarketSeller.IDProductCategory : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(MarketSellerValidationSchema),
    defaultValues: {
      name,
      lastName,
      marketName,
      phoneNumber,
      idProductCategory,
    },
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  useEffect(() => {
    if (existingMarketSeller) {
      setName(existingMarketSeller.Name);
      setLastName(existingMarketSeller.LastName);
      setMarketName(existingMarketSeller.MarketName);
      setPhoneNumber(existingMarketSeller.PhoneNumber);
      setIdProductCategory(existingMarketSeller.IDProductCategory);

      let defaults = {
        name,
        lastName,
        marketName,
        phoneNumber,
        idProductCategory,
      };

      reset(defaults);
    }
  }, [existingMarketSeller, reset]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleMarketNameChange = (event) => {
    setMarketName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleIdProductCategoryChange = (event) => {
    setIdProductCategory(event.target.value);
  };

  return (
    <Box
      p={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 } }}
    >
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Comerciante
        </Typography>
        <Grid container sx={{ width: "100%" }} direction={"column"}>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ px: 1, pt: 1, width: "100%" }}
          >
            <FormField
              required={true}
              type="text"
              label={"Nombre"}
              name={"name"}
              value={name}
              onChange={handleNameChange}
              error={!!errors["name"]}
              helperText={getHelperText("name")}
              inputProps={register("name")}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ px: 1, pt: 1 }}
          >
            <FormField
              required={true}
              type="text"
              label={"Apellido"}
              name={"lastName"}
              value={lastName}
              onChange={handleLastNameChange}
              error={!!errors["lastName"]}
              helperText={getHelperText("lastName")}
              inputProps={register("lastName")}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ px: 1, pt: 1 }}
          >
            <FormField
              required={true}
              type="text"
              label={"Mercado o Comercio"}
              name={"marketName"}
              value={marketName}
              onChange={handleMarketNameChange}
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
            sx={{ px: 1, pt: 1 }}
          >
            <FormField
              required={true}
              type="number"
              label={"Número de Teléfono"}
              name={"phoneNumber"}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              error={!!errors["phoneNumber"]}
              helperText={getHelperText("phoneNumber")}
              inputProps={register("phoneNumber")}
            />
          </Grid>
          <Grid
            item
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ px: 1, pt: 1 }}
          >
            <FormField
              required={true}
              select={true}
              label={"Categoría del Producto"}
              name={"idProductCategory"}
              value={idProductCategory}
              onChange={handleIdProductCategoryChange}
              error={!!errors["idProductCategory"]}
              helperText={getHelperText("idProductCategory")}
              inputProps={register("idProductCategory")}
            >
              {state.productCategory.productCategories.map(
                (productCategory) => (
                  <MenuItem key={productCategory.Id} value={productCategory.Id}>
                    {productCategory.ProductCategoryName}
                  </MenuItem>
                )
              )}
            </FormField>
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        isLastStep
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onCreateSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateSubmitFunction)}
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={closeDialogs}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={closeDialogs}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={closeDialogs}
      />
    </Box>
  );
};

MarketSellerForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingMarketSeller: PropTypes.object,
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
};

MarketSellerForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingMarketSeller: null,
};

export default MarketSellerForm;
