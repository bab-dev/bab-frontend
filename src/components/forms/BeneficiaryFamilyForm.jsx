import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { variables } from "../../variables.js";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import { getActualDate, parseDate } from "helpers/dateHelper.js";
import BeneficiaryFamilyValidationSchema from "validationSchemas/beneficiaryFamilyValidationSchema.js";
import { housingTypes } from "variables/beneficiariesFamiliesVariables.js";

const BeneficiaryFamilyForm = ({
  isCreate,
  isUpdate,
  isSignUp,
  existingBeneficiaryFamily,
  showAlert,
  handleHideAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const [beneficiaryType, setBeneficiaryType] = useState(
    existingBeneficiaryFamily ? existingBeneficiaryFamily.BeneficiaryType : 0
  );
  const [housingType, setHousingType] = useState(
    existingBeneficiaryFamily ? existingBeneficiaryFamily.HousingType : 0
  );
  const [registrationDate, setRegistrationDate] = useState(
    existingBeneficiaryFamily
      ? parseDate(existingBeneficiaryFamily.RegistrationDate)
      : getActualDate()
  );
  const [zone, setZone] = useState(
    existingBeneficiaryFamily ? existingBeneficiaryFamily.Zone : ""
  );

  const [observations, setObservations] = useState(
    existingBeneficiaryFamily ? existingBeneficiaryFamily.Observations : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BeneficiaryFamilyValidationSchema),
  });

  const getHelperText = (prop) => {
    if (errors[prop]) {
      return errors[prop].message;
    }
    return "";
  };

  return (
    <Box
      p={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 } }}
    >
      <Box pb={1}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Datos Adicionales
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Tipo de Beneficiario"}
                name={"beneficiaryType"}
                select={true}
                value={beneficiaryType}
                onChange={(event) => setBeneficiaryType(event.target.value)}
                error={!!errors["beneficiaryType"]}
                helperText={getHelperText("beneficiaryType")}
                inputProps={register("beneficiaryType")}
              >
                {variables.BENEFICIARY_TYPE.map((type) => (
                  <MenuItem key={type.name} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Fecha de Registro"}
                name={"registrationDate"}
                type="date"
                value={registrationDate}
                onChange={(event) => setRegistrationDate(event.target.value)}
                error={!!errors["registrationDate"]}
                helperText={getHelperText("registrationDate")}
                inputProps={register("registrationDate")}
                max={getActualDate()}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Tipo de Vivienda"}
                name={"housingType"}
                select={true}
                value={housingType}
                onChange={(event) => setHousingType(event.target.value)}
                inputProps={register("housingType")}
              >
                {housingTypes.map((type) => (
                  <MenuItem key={type.name} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Zona"}
                name={"zone"}
                type={"text"}
                value={zone}
                onChange={(event) => setZone(event.target.value)}
                error={!!errors["zone"]}
                helperText={getHelperText("zone")}
                inputProps={register("zone")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
              <FormField
                type="text"
                label={"Observaciones"}
                name={"observations"}
                multiline={true}
                value={observations}
                onChange={(event) => setObservations(event.target.value)}
                error={!!errors["observations"]}
                helperText={getHelperText("observations")}
                inputProps={register("observations")}
              />
            </Grid>
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

BeneficiaryFamilyForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  existingBeneficiaryFamily: PropTypes.object,
  showAlert: PropTypes.bool,
  handleHideAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

BeneficiaryFamilyForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingBeneficiaryFamily: null,
};

export default BeneficiaryFamilyForm;
