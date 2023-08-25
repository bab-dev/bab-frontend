import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Grid, MenuItem, Typography } from "@mui/material";
import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import { getActualDate, getActualTime, parseDate } from "helpers/dateHelper.js";
import tripValidationSchema from "validationSchemas/tripValidationSchema.js";

import { tripVariables } from "variables/tripsVariables.js";
import { transportVariables } from "variables/transportVariables.js";
import { getPlacesListByType } from "helpers/placeHelper.js";

const TripForm = ({
  isCreate,
  isUpdate,
  existingTrip,
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
    existingTrip ? existingTrip.IDCoordinator : ""
  );
  const [idDepartment, setIDDepartment] = useState(
    existingTrip ? existingTrip.IDDepartment : ""
  );
  const [vehicule, setVehicule] = useState(
    existingTrip ? existingTrip.Vehicule : ""
  );
  const [date, setDate] = useState(
    existingTrip ? parseDate(existingTrip.Date) : getActualDate()
  );
  const [numOfPassengers, setNumOfPassengers] = useState(
    existingTrip ? existingTrip.NumOfPassengers : 1
  );
  const [transportType, setTransportType] = useState(
    existingTrip ? existingTrip.TransportType : 0
  );
  const [departureType, setDepartureType] = useState(
    existingTrip ? existingTrip.DepartureType : 3
  );
  const [departureIDPlace, setDepartureIDPlace] = useState(
    existingTrip ? existingTrip.DepartureIDPlace : ""
  );
  const [departureTime, setDepartureTime] = useState(
    existingTrip ? existingTrip.DepartureTime : getActualTime()
  );
  const [initialKm, setInitialKm] = useState(
    existingTrip ? existingTrip.InitialKm : ""
  );
  const [arrivalType, setArrivalType] = useState(
    existingTrip ? existingTrip.ArrivalType : 2
  );
  const [arrivalIDPlace, setArrivalIDPlace] = useState(
    existingTrip ? existingTrip.ArrivalIDPlace : ""
  );
  const [arrivalTime, setArrivalTime] = useState(
    existingTrip ? existingTrip.ArrivalTime : getActualTime()
  );
  const [finalKm, setFinalKm] = useState(
    existingTrip ? existingTrip.FinalKm : ""
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripValidationSchema),
  });

  const getHelperText = (prop) => {
    if (errors[prop]) {
      return errors[prop].message;
    }
    return "";
  };

  useEffect(() => {
    if (existingTrip) {
      setIDCoordinator(existingTrip.IDCoordinator);
      setIDDepartment(existingTrip.IDDepartment);
      setVehicule(existingTrip.Vehicule);
      setDate(parseDate(existingTrip.Date));
      setNumOfPassengers(existingTrip.NumOfPassengers);
      setTransportType(existingTrip.TransportType);
      setDepartureType(existingTrip.DepartureType);
      setDepartureIDPlace(existingTrip.DepartureIDPlace);
      setDepartureTime(existingTrip.DepartureTime);
      setInitialKm(existingTrip.InitialKm);
      setArrivalType(existingTrip.ArrivalType);
      setArrivalIDPlace(existingTrip.ArrivalIDPlace);
      setArrivalTime(existingTrip.ArrivalTime);
      setFinalKm(existingTrip.FinalKm);

      let defaults = {
        idCoordinator,
        idDepartment,
        vehicule,
        date,
        numOfPassengers,
        transportType,
        departureType,
        departureIDPlace,
        departureTime,
        initialKm,
        arrivalType,
        arrivalIDPlace,
        arrivalTime,
        finalKm,
      };

      reset(defaults);
    }
  }, [existingTrip, reset]);

  return (
    <Box
      py={2}
      sx={{
        width: "100%",
        px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2 },
      }}
    >
      <Box pb={1}>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Viaje
        </Typography>
        <Grid container sx={{ width: "100%" }}>
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
                label={"Departamento"}
                name={"idDepartment"}
                select={true}
                value={idDepartment}
                onChange={(event) => setIDDepartment(event.target.value)}
                error={!!errors["idDepartment"]}
                helperText={getHelperText("idDepartment")}
                inputProps={register("idDepartment")}
              >
                {state.department.departments.map((department) => (
                  <MenuItem key={department.Id} value={department.Id}>
                    {department.DepartmentName}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Vehiculo"}
                name={"vehicule"}
                type="text"
                value={vehicule}
                onChange={(event) => setVehicule(event.target.value)}
                error={!!errors["vehicule"]}
                helperText={getHelperText("vehicule")}
                inputProps={register("vehicule")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Tipo de Transporte"}
                name={"transportType"}
                select={true}
                value={transportType}
                onChange={(event) => setTransportType(event.target.value)}
                error={!!errors["transportType"]}
                helperText={getHelperText("transportType")}
                inputProps={register("transportType")}
              >
                {transportVariables.TRANSPORT_TYPES.map((type) => (
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
                required={true}
                label={"Fecha"}
                name={"date"}
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                error={!!errors["date"]}
                helperText={getHelperText("date")}
                inputProps={register("date")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Número de Pasajeros"}
                name={"numOfPassengers"}
                type="number"
                value={numOfPassengers}
                onChange={(event) => setNumOfPassengers(event.target.value)}
                error={!!errors["numOfPassengers"]}
                helperText={getHelperText("numOfPassengers")}
                inputProps={register("numOfPassengers")}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Tipo de Punto de Salida"}
                name={"departureType"}
                select={true}
                value={departureType}
                onChange={(event) => setDepartureType(event.target.value)}
                error={!!errors["departureType"]}
                helperText={getHelperText("departureType")}
                inputProps={register("departureType")}
              >
                {tripVariables.PLACE_TYPE.map((type) => (
                  <MenuItem key={type.name} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Punto de Salida"}
                name={"departureIDPlace"}
                select={true}
                value={departureIDPlace}
                onChange={(event) => setDepartureIDPlace(event.target.value)}
                error={!!errors["departureIDPlace"]}
                helperText={getHelperText("departureIDPlace")}
                inputProps={register("departureIDPlace")}
              >
                {getPlacesListByType(state, departureType)}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Hora de Salida"}
                name={"departureTime"}
                type="time"
                value={departureTime}
                onChange={(event) => setDepartureTime(event.target.value)}
                error={!!errors["departureTime"]}
                helperText={getHelperText("departureTime")}
                inputProps={register("departureTime")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Kilometraje Inicial"}
                name={"initialKm"}
                type="number"
                value={initialKm}
                onChange={(event) => setInitialKm(event.target.value)}
                error={!!errors["initialKm"]}
                helperText={getHelperText("initialKm")}
                inputProps={register("initialKm")}
                endLabel={"km"}
              />
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Tipo de Punto de Llegada"}
                name={"arrivalType"}
                select={true}
                value={arrivalType}
                onChange={(event) => setArrivalType(event.target.value)}
                error={!!errors["arrivalType"]}
                helperText={getHelperText("arrivalType")}
                inputProps={register("arrivalType")}
              >
                {tripVariables.PLACE_TYPE.map((type) => (
                  <MenuItem key={type.name} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Punto de Llegada"}
                name={"arrivalIDPlace"}
                select={true}
                value={arrivalIDPlace}
                onChange={(event) => setArrivalIDPlace(event.target.value)}
                error={!!errors["arrivalIDPlace"]}
                helperText={getHelperText("arrivalIDPlace")}
                inputProps={register("arrivalIDPlace")}
              >
                {getPlacesListByType(state, arrivalType)}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Hora de Llegada"}
                name={"arrivalTime"}
                type="time"
                value={arrivalTime}
                onChange={(event) => setArrivalTime(event.target.value)}
                error={!!errors["arrivalTime"]}
                helperText={getHelperText("arrivalTime")}
                inputProps={register("arrivalTime")}
              />
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                label={"Kilometraje Final"}
                name={"finalKm"}
                type="number"
                value={finalKm}
                onChange={(event) => setFinalKm(event.target.value)}
                error={!!errors["finalKm"]}
                helperText={getHelperText("finalKm")}
                inputProps={register("finalKm")}
                endLabel={"km"}
              />
            </Grid>
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

TripForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingTrip: PropTypes.object,
  onCancelClick: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  closeDialogs: PropTypes.func,
};

TripForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  existingTrip: null,
};

export default TripForm;
