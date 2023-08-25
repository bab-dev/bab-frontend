import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { variables } from "../../variables.js";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import { getActualDate, parseDate } from "helpers/dateHelper.js";
import BeneficiaryOrganizationValidationSchema from "validationSchemas/beneficiaryOrganizationValidationSchema.js";

const BeneficiaryOrganizationForm = ({
  isCreate,
  isUpdate,
  existingOrganization,
  showErrorAlert,
  showCreatedAlert,
  showUpdatedAlert,
  closeDialogs,
  onCancelClick,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
}) => {
  const state = useSelector((state) => state);

  const [idCoordinator, setIDCoordinator] = useState(
    existingOrganization ? existingOrganization.IDCoordinator : ""
  );
  const [organizationName, setOrganizationName] = useState(
    existingOrganization ? existingOrganization.OrganizationName : ""
  );
  const [organizationType, setOrganizationType] = useState(
    existingOrganization ? existingOrganization.OrganizationType : 1
  );
  const [program, setProgram] = useState(
    existingOrganization ? existingOrganization.Program : ""
  );
  const [contractStartDate, setContractStartDate] = useState(
    existingOrganization
      ? parseDate(existingOrganization.ContractStartDate)
      : getActualDate()
  );
  const [contractEndDate, setContractEndDate] = useState(
    existingOrganization
      ? parseDate(existingOrganization.ContractEndDate)
      : getActualDate()
  );
  const [legalRepresentative, setLegalRepresentative] = useState(
    existingOrganization ? existingOrganization.LegalRepresentative : ""
  );
  const [address, setAddress] = useState(
    existingOrganization ? existingOrganization.Address : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    existingOrganization ? existingOrganization.PhoneNumber : ""
  );
  const [totalPopulation, setTotalPopulation] = useState(
    existingOrganization ? existingOrganization.TotalPopulation : ""
  );
  const [observations, setObservations] = useState(
    existingOrganization ? existingOrganization.Observations : ""
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BeneficiaryOrganizationValidationSchema),
  });

  const getHelperText = (prop) => {
    if (errors[prop]) {
      return errors[prop].message;
    }
    return "";
  };

  useEffect(() => {
    if (existingOrganization) {
      setIDCoordinator(existingOrganization.IDCoordinator);
      setOrganizationName(existingOrganization.OrganizationName);
      setOrganizationType(existingOrganization.OrganizationType);
      setProgram(existingOrganization.Program);
      setContractStartDate(parseDate(existingOrganization.ContractStartDate));
      setContractEndDate(parseDate(existingOrganization.ContractEndDate));
      setLegalRepresentative(existingOrganization.LegalRepresentative);
      setAddress(existingOrganization.Address);
      setPhoneNumber(existingOrganization.PhoneNumber);
      setTotalPopulation(existingOrganization.TotalPopulation);
      setObservations(existingOrganization.Observations);

      let defaults = {
        idCoordinator,
        organizationName,
        organizationType,
        program,
        contractStartDate,
        contractEndDate,
        legalRepresentative,
        address,
        phoneNumber,
        totalPopulation,
        observations,
      };

      reset(defaults);
    }
  }, [existingOrganization, reset]);

  return (
    <Box
      p={2}
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 } }}
    >
      <Box pb={1}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Organización Beneficiaria
        </Typography>
        <Grid container sx={{ width: "100%" }}>
          <Grid item xxs={12} xs={12} sm={6} md={12} lg={12} sx={{ px: 1 }}>
            <FormField
              required={true}
              label={"Nombre de la Organización"}
              name={"organizationName"}
              type="text"
              value={organizationName}
              onChange={(event) => setOrganizationName(event.target.value)}
              error={!!errors["organizationName"]}
              helperText={getHelperText("organizationName")}
              inputProps={register("organizationName")}
            />
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Coordinador"}
                name={"idCoordinator"}
                select={true}
                value={idCoordinator}
                onChange={(event) => setIDCoordinator(event.target.value)}
                error={!!errors["idCoordinator"]}
                helperText={getHelperText("idCoordinator")}
                inputProps={register("idCoordinator")}
              >
                {state.volunteer.volunteers.map((volunteer) => (
                  <MenuItem
                    key={volunteer.IdVolunteer}
                    value={volunteer.IdVolunteer}
                  >
                    {volunteer.FullName}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Tipo de Organización"}
                name={"organizationType"}
                select={true}
                value={organizationType}
                onChange={(event) => setOrganizationType(event.target.value)}
                error={!!errors["organizationType"]}
                helperText={getHelperText("organizationType")}
                inputProps={register("organizationType")}
              >
                {variables.BENEFICIARY_TYPE.map((type) => (
                  <MenuItem key={type.name} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                label={"Programa"}
                name={"program"}
                type="text"
                value={program}
                onChange={(event) => setProgram(event.target.value)}
                error={!!errors["program"]}
                helperText={getHelperText("program")}
                inputProps={register("program")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Población Total"}
                name={"totalPopulation"}
                type="text"
                value={totalPopulation}
                onChange={(event) => setTotalPopulation(event.target.value)}
                error={!!errors["totalPopulation"]}
                helperText={getHelperText("totalPopulation")}
                inputProps={register("totalPopulation")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Inicio del Contrato"}
                name={"contractStartDate"}
                type="date"
                value={contractStartDate}
                onChange={(event) => setContractStartDate(event.target.value)}
                error={!!errors["contractStartDate"]}
                helperText={getHelperText("contractStartDate")}
                inputProps={register("contractStartDate")}
                //max={getActualDate()}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Fin del Contrato"}
                name={"contractEndDate"}
                type="date"
                value={contractEndDate}
                onChange={(event) => setContractEndDate(event.target.value)}
                error={!!errors["contractEndDate"]}
                helperText={getHelperText("contractEndDate")}
                inputProps={register("contractEndDate")}
                min={contractStartDate}
              />
            </Grid>
          </Grid>
          <Grid item xxs={12} xs={12} sm={6} md={12} lg={12} sx={{ px: 1 }}>
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
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Representante Legal"}
                name={"legalRepresentative"}
                type="text"
                value={legalRepresentative}
                onChange={(event) => setLegalRepresentative(event.target.value)}
                error={!!errors["legalRepresentative"]}
                helperText={getHelperText("legalRepresentative")}
                inputProps={register("legalRepresentative")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Teléfono"}
                name={"phoneNumber"}
                type="number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                error={!!errors["phoneNumber"]}
                helperText={getHelperText("phoneNumber")}
                inputProps={register("phoneNumber")}
              />
            </Grid>
          </Grid>
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

BeneficiaryOrganizationForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingOrganization: PropTypes.object,
  onCancelClick: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  closeDialogs: PropTypes.func,
};

BeneficiaryOrganizationForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  existingOrganization: null,
};

export default BeneficiaryOrganizationForm;
