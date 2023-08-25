import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Grid, Typography } from "@mui/material";
import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import ClockInValidationSchema from "validationSchemas/clockInValidationSchema.js";

const ClockInForm = ({
  showErrorAlert,
  showCreatedAlert,
  closeDialogs,
  onCancelClick,
  onCreateSubmitFunction,
}) => {
  const [idVolunteer, setIDVolunteer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClockInValidationSchema),
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
          Ingreso
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
            <FormField
              required={true}
              label={"Código del Voluntario"}
              name={"idVolunteer"}
              type="number"
              value={idVolunteer}
              onChange={(event) => setIDVolunteer(event.target.value)}
              error={!!errors["idVolunteer"]}
              helperText={getHelperText("idVolunteer")}
              inputProps={register("idVolunteer")}
            />
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isCreate
        isSignUp
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onCreateSubmitFunction)}
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={closeDialogs}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={closeDialogs}
      />
    </Box>
  );
};

ClockInForm.propTypes = {
  onCancelClick: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  onCreateSubmitFunction: PropTypes.func,
  closeDialogs: PropTypes.func,
};

export default ClockInForm;
