import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { React, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import personValidationSchema from "validationSchemas/personValidationSchema.js";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";

import PropTypes from "prop-types";
import { variables } from "../../variables.js";
import { getActualDate, parseDate } from "helpers/dateHelper.js";

const PersonForm = ({
  isCreate,
  isUpdate,
  isSignUp,
  existingPerson,
  showAlert,
  handleHideAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const [firstName, setFirstName] = useState(
    existingPerson ? existingPerson.FirstName : ""
  );
  const [middleName, setMiddleName] = useState(
    existingPerson ? existingPerson.MiddleName : ""
  );
  const [firstSurname, setFirstSurname] = useState(
    existingPerson ? existingPerson.FirstSurname : ""
  );
  const [secondSurname, setSecondSurname] = useState(
    existingPerson ? existingPerson.SecondSurname : ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    existingPerson ? parseDate(existingPerson.DateOfBirth) : getActualDate()
  );

  const [email, setEmail] = useState(
    existingPerson ? existingPerson.Email : ""
  );
  const [occupation, setOccupation] = useState(
    existingPerson ? existingPerson.Occupation : ""
  );
  const [ci, setCI] = useState(existingPerson ? existingPerson.CI : "");
  const [address, setAddress] = useState(
    existingPerson ? existingPerson.Address : ""
  );
  const [city, setCity] = useState(
    existingPerson ? existingPerson.City : variables.CITIES[0]
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingPerson ? existingPerson.PhoneNumber : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personValidationSchema),
  });

  const getHelperText = (prop) => {
    if (errors[prop]) {
      if (prop == "ci" || prop == "phoneNumber") {
        return `${prop} must be a number`;
      }
      return errors[prop].message;
    }
    return "";
  };

  return (
    <Box p={2}>
      <Box pb={1}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Datos Personales
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Primer Nombre"}
                name={"firstName"}
                type={"text"}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                error={!!errors["firstName"]}
                helperText={getHelperText("firstName")}
                inputProps={register("firstName")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Segundo Nombre"}
                name={"middleName"}
                type={"text"}
                value={middleName}
                onChange={(event) => setMiddleName(event.target.value)}
                inputProps={register("middleName")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Apellido Paterno"}
                name={"firstSurname"}
                type={"text"}
                value={firstSurname}
                onChange={(event) => setFirstSurname(event.target.value)}
                error={!!errors["firstSurname"]}
                helperText={getHelperText("firstSurname")}
                inputProps={register("firstSurname")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Apellido Materno"}
                name={"secondSurname"}
                type={"text"}
                value={secondSurname}
                onChange={(event) => setSecondSurname(event.target.value)}
                inputProps={register("secondSurname")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Fecha de Nacimiento"}
                name={"dateOfBirth"}
                type="date"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                error={!!errors["dateOfBirth"]}
                helperText={getHelperText("dateOfBirth")}
                inputProps={register("dateOfBirth")}
                min="1980-01-24"
                max={getActualDate()}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Correo Electrónico"}
                name={"email"}
                type={"text"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={!!errors["email"]}
                helperText={getHelperText("email")}
                inputProps={register("email")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Ocupación"}
                name={"occupation"}
                type={"text"}
                value={occupation}
                onChange={(event) => setOccupation(event.target.value)}
                error={!!errors["occupation"]}
                helperText={getHelperText("occupation")}
                inputProps={register("occupation")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Cédula de Identidad"}
                name={"ci"}
                type={"number"}
                value={ci}
                onChange={(event) => setCI(event.target.value)}
                error={!!errors["ci"]}
                helperText={getHelperText("ci")}
                inputProps={register("ci")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box width={"100%"}>
        <Typography variant="h5" sx={{ py: 2, px: 1 }}>
          Información de Contacto
        </Typography>
        <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
          <FormField
            required={true}
            label={"Dirección"}
            name={"address"}
            type={"text"}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            error={!!errors["address"]}
            helperText={getHelperText("address")}
            inputProps={register("address")}
          />
        </Grid>
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              select={true}
              label={"Ciudad"}
              name={"city"}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              error={!!errors["city"]}
              helperText={getHelperText("city")}
              inputProps={register("city")}
            >
              {variables.CITIES.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              label={"Celular"}
              name={"phoneNumber"}
              type={"number"}
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              error={!!errors["phoneNumber"]}
              helperText={getHelperText("phoneNumber")}
              inputProps={register("phoneNumber")}
            />
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
        isSignUp={isSignUp}
        showAlert={showAlert}
        handleHideAlert={handleHideAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateClickSubmit)}
      />
    </Box>
  );
};

PersonForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  existingPerson: PropTypes.object,
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

PersonForm.defaultProps = {
  isSignUp: false,
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingPerson: null,
};

export default PersonForm;
