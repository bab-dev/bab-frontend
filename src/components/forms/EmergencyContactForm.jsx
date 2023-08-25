import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";
import { variables } from "../../variables.js";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import emergencyContactValidationSchema from "validationSchemas/emergencyContactValidationSchema.js";

const EmergencyContactForm = ({
  isLastStep,
  isCreate,
  isUpdate,
  existingEmergencyContact,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onCancelClick,
  onSubmitFunction,
  onUpdateClickSubmit,
}) => {
  const [name, setName] = useState(
    existingEmergencyContact ? existingEmergencyContact.Name : ""
  );
  const [lastName, setLastName] = useState(
    existingEmergencyContact ? existingEmergencyContact.LastName : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingEmergencyContact ? existingEmergencyContact.PhoneNumber : ""
  );
  const [relationship, setRelationship] = useState(
    existingEmergencyContact ? existingEmergencyContact.Relationship : 0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emergencyContactValidationSchema),
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  return (
    <Box p={2} width={"100%"}>
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Contacto de Emergencia
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Nombre"}
                name={"name"}
                type={"text"}
                value={name}
                onChange={(event) => setName(event.target.value)}
                error={!!errors["name"]}
                helperText={getHelperText("name")}
                inputProps={register("name")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Apellido"}
                name={"lastName"}
                type={"text"}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                error={!!errors["lastName"]}
                helperText={getHelperText("lastName")}
                inputProps={register("lastName")}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "space-between" }}>
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
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Relación"}
                name={"relationship"}
                value={relationship}
                onChange={(event) => setRelationship(event.target.value)}
                error={!!errors["relationship"]}
                helperText={getHelperText("relationship")}
                inputProps={register("relationship")}
              >
                {variables.EMERGENCY_CONTACT_RELATIONSHIPS.map((contact) => (
                  <MenuItem key={contact.name} value={contact.value}>
                    {contact.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <FormActions
        isLastStep={isLastStep}
        isCreate={isCreate}
        isUpdate={isUpdate}
        showErrorAlert={showErrorAlert}
        handleShowErrorAlert={handleShowErrorAlert}
        showCreatedAlert={showCreatedAlert}
        handleShowCreatedAlert={handleShowCreatedAlert}
        showUpdatedAlert={showUpdatedAlert}
        handleShowUpdatedAlert={handleShowUpdatedAlert}
        onClickonCancelClick={onCancelClick}
        onClickSubmit={handleSubmit(onSubmitFunction)}
        onUpdateClickSubmit={handleSubmit(onUpdateClickSubmit)}
      />
    </Box>
  );
};

EmergencyContactForm.propTypes = {
  isLastStep: PropTypes.any,
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingEmergencyContact: PropTypes.object,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSubmitFunction: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
};

EmergencyContactForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
  existingEmergencyContact: null,
};

export default EmergencyContactForm;
