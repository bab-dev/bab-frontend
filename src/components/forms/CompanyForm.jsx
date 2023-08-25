import { Box, Grid, Typography } from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import CompanyValidationSchema from "validationSchemas/companyValidationSchema.js";

const CompanyForm = ({
  isCreate,
  isUpdate,
  existingCompany,
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
  const [companyComercialName, setCompanyComercialName] = useState(
    existingCompany ? existingCompany.CompanyComercialName : ""
  );
  const [address, setAddress] = useState(
    existingCompany ? existingCompany.Address : ""
  );
  const [businessName, setBusinessName] = useState(
    existingCompany ? existingCompany.BusinessName : ""
  );
  const [representative, setRepresentative] = useState(
    existingCompany ? existingCompany.Representative : ""
  );
  const [representativePosition, setRepresentativePosition] = useState(
    existingCompany ? existingCompany.RepresentativePosition : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingCompany ? existingCompany.PhoneNumber : ""
  );
  const [email, setEmail] = useState(
    existingCompany ? existingCompany.Email : ""
  );
  const [imageURL, setImageURL] = useState(
    existingCompany ? existingCompany.ImageURL : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CompanyValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  useEffect(() => {
    if (existingCompany) {
      setCompanyComercialName(existingCompany.CompanyComercialName);
      setAddress(existingCompany.Address);
      setBusinessName(existingCompany.BusinessName);
      setRepresentative(existingCompany.Representative);
      setRepresentativePosition(existingCompany.RepresentativePosition);
      setPhoneNumber(existingCompany.PhoneNumber);
      setEmail(existingCompany.Email);
      setImageURL(existingCompany.ImageURL);

      let defaults = {
        companyComercialName,
        address,
        businessName,
        representative,
        representativePosition,
        phoneNumber,
        email,
        imageURL,
      };

      reset(defaults);
    }
  }, [existingCompany, reset]);

  return (
    <Box m={{ xxs: 2, xs: 4, sm: 6, md: 6 }}>
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Empresa
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
              label={"Nombre Comercial de la empresa"}
              name={"companyComercialName"}
              value={companyComercialName}
              onChange={(event) => setCompanyComercialName(event.target.value)}
              error={!!errors["companyComercialName"]}
              helperText={getHelperText("companyComercialName")}
              inputProps={register("companyComercialName")}
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
              label={"Razón Social"}
              name={"businessName"}
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              error={!!errors["businessName"]}
              helperText={getHelperText("businessName")}
              inputProps={register("businessName")}
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
              label={"Dirección"}
              name={"address"}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error={!!errors["address"]}
              helperText={getHelperText("address")}
              inputProps={register("address")}
            />
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
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
                label={"Representante"}
                name={"representative"}
                value={representative}
                onChange={(event) => setRepresentative(event.target.value)}
                error={!!errors["representative"]}
                helperText={getHelperText("representative")}
                inputProps={register("representative")}
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
                label={"Posición del Representante"}
                name={"representativePosition"}
                value={representativePosition}
                onChange={(event) =>
                  setRepresentativePosition(event.target.value)
                }
                error={!!errors["representativePosition"]}
                helperText={getHelperText("representativePosition")}
                inputProps={register("representativePosition")}
              />
            </Grid>
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
              onChange={(event) => setPhoneNumber(event.target.value)}
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
              type="text"
              label={"Correo electrónico"}
              name={"email"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={!!errors["email"]}
              helperText={getHelperText("email")}
              inputProps={register("email")}
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
              label={"URL de la imágen"}
              name={"imageURL"}
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
              error={!!errors["imageURL"]}
              helperText={getHelperText("imageURL")}
              inputProps={register("imageURL")}
            />
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        isLastStep
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

CompanyForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingCompany: PropTypes.object,
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

CompanyForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingCompany: null,
};

export default CompanyForm;
