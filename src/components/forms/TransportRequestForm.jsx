import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import PropTypes from "prop-types";

import FormField from "../FormField.jsx";
import FormActions from "../FormActions.jsx";
import transportRequestValidationSchema from "validationSchemas/transportRequestValidationSchema.js";
import { transportVariables } from "variables/transportVariables.js";
import { getActualDate, parseDate } from "helpers/dateHelper.js";
import { tripVariables } from "variables/tripsVariables.js";
import { getPlacesListByType } from "helpers/placeHelper.js";

const TransportRequestForm = ({
  isCreate,
  isUpdate,
  isDirector,
  existingRequest,
  showErrorAlert,
  showCreatedAlert,
  showUpdatedAlert,
  closeDialogs,
  onCancelClick,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
}) => {
  const state = useSelector((state) => state);

  const [idCoordinator, setIdCoordinator] = useState(
    existingRequest ? existingRequest.IDCoordinator : ""
  );
  const [idDepartment, setIdDepartment] = useState(
    existingRequest ? existingRequest.IDDepartment : ""
  );
  const [transportType, setTransportType] = useState(
    existingRequest ? existingRequest.TransportType : 0
  );
  const [placeType, setPlaceType] = useState(
    existingRequest ? existingRequest.PlaceType : ""
  );
  const [idPlace, setIdPlace] = useState(
    existingRequest ? existingRequest.IDPlace : ""
  );
  const [date, setDate] = useState(
    existingRequest ? parseDate(existingRequest.Date) : getActualDate()
  );
  const [timeRange, setTimeRange] = useState(
    existingRequest ? existingRequest.TimeRange : "8:00AM - 9:30AM"
  );
  const [detail, setDetail] = useState(
    existingRequest ? existingRequest.Detail : ""
  );
  const [observations, setObservations] = useState(
    existingRequest ? existingRequest.Observations : ""
  );
  const [priority, setPriority] = useState(
    existingRequest ? existingRequest.Priority : 0
  );
  const [status, setStatus] = useState(
    existingRequest ? existingRequest.Status : 0
  );
  const [commentByDirector, setCommentByDirector] = useState(
    existingRequest ? existingRequest.CommentByDirector : ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(transportRequestValidationSchema),
    defaultValues: {
      idCoordinator,
      idDepartment,
      transportType,
      placeType,
      idPlace,
      date,
      timeRange,
      detail,
      observations,
      priority,
      status,
      commentByDirector,
    },
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  useEffect(() => {
    if (existingRequest) {
      setIdCoordinator(existingRequest.IDCoordinator);
      setIdDepartment(existingRequest.IDDepartment);
      setTransportType(existingRequest.TransportType);
      setPlaceType(existingRequest.PlaceType);
      setIdPlace(existingRequest.IDPlace);
      setDate(parseDate(existingRequest.Date));
      setTimeRange(existingRequest.TimeRange);
      setDetail(existingRequest.Detail);
      setObservations(existingRequest.Observations);
      setPriority(existingRequest.Priority);
      setStatus(existingRequest.Status);
      setCommentByDirector(existingRequest.CommentByDirector);

      let defaults = {
        idCoordinator,
        idDepartment,
        transportType,
        placeType,
        idPlace,
        date,
        timeRange,
        detail,
        observations,
        priority,
        status,
        commentByDirector,
      };

      reset(defaults);
    }
  }, [existingRequest, reset]);

  return (
    <Box
      sx={{ width: "100%", px: { xxs: 0, xs: 0, sm: 1, md: 2, lg: 2, xl: 2 } }}
    >
      <Box>
        <Typography variant="h5" sx={{ pb: 2, px: 1 }}>
          Solicitud de Transporte
        </Typography>
        <Grid container sx={{ width: "100%" }}>
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
              label={"Coordinador"}
              name={"idCoordinator"}
              value={idCoordinator}
              onChange={(event) => setIdCoordinator(event.target.value)}
              error={!!errors["idCoordinator"]}
              helperText={getHelperText("idCoordinator")}
              inputProps={register("idCoordinator")}
            >
              {state.volunteer.volunteers.map((volunteer) => (
                <MenuItem
                  key={volunteer.FullName}
                  value={volunteer.IdVolunteer}
                >
                  {volunteer.FullName}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Departamento BAB"}
                name={"idDepartment"}
                value={idDepartment}
                onChange={(event) => setIdDepartment(event.target.value)}
                error={!!errors["idDepartment"]}
                helperText={getHelperText("idDepartment")}
                inputProps={register("idDepartment")}
              >
                {state.department.departments.map((department) => (
                  <MenuItem
                    key={department.DepartmentName}
                    value={department.Id}
                  >
                    {department.DepartmentName}
                  </MenuItem>
                ))}
              </FormField>
            </Grid>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Tipo de Transporte"}
                name={"transportType"}
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
                label={"Tipo de Lugar"}
                name={"placeType"}
                select={true}
                value={placeType}
                onChange={(event) => setPlaceType(event.target.value)}
                error={!!errors["placeType"]}
                helperText={getHelperText("placeType")}
                inputProps={register("placeType")}
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
                label={"Lugar"}
                name={"idPlace"}
                select={true}
                value={idPlace}
                onChange={(event) => setIdPlace(event.target.value)}
                error={!!errors["idPlace"]}
                helperText={getHelperText("idPlace")}
                inputProps={register("idPlace")}
              >
                {getPlacesListByType(state, placeType)}
              </FormField>
            </Grid>
          </Grid>
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                type="date"
                label={"Fecha"}
                name={"date"}
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
                type="text"
                label={"Horario"}
                name={"timeRange"}
                value={timeRange}
                onChange={(event) => setTimeRange(event.target.value)}
                error={!!errors["timeRange"]}
                helperText={getHelperText("timeRange")}
                inputProps={register("timeRange")}
              />
            </Grid>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
            <FormField
              required={true}
              type="text"
              label={"Detalle"}
              name={"detail"}
              multiline={true}
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              error={!!errors["detail"]}
              helperText={getHelperText("detail")}
              inputProps={register("detail")}
            />
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
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
              <FormField
                required={true}
                select={true}
                label={"Prioridad"}
                name={"priority"}
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                error={!!errors["priority"]}
                helperText={getHelperText("priority")}
                inputProps={register("priority")}
              >
                {transportVariables.TRANSPORT_REQUEST_PRIORITY.map(
                  (priority) => (
                    <MenuItem key={priority.name} value={priority.value}>
                      {priority.label}
                    </MenuItem>
                  )
                )}
              </FormField>
            </Grid>
            {existingRequest && (
              <Grid item xxs={12} xs={12} sm={6} md={6} lg={6} sx={{ px: 1 }}>
                <FormField
                  select={true}
                  label={"Estado"}
                  name={"status"}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  error={!!errors["status"]}
                  helperText={getHelperText("status")}
                  inputProps={register("status")}
                >
                  {transportVariables.TRANSPORT_REQUEST_STATUS.map((status) => (
                    <MenuItem key={status.name} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>
            )}
          </Grid>
        </Grid>
        {!isCreate && isDirector && (
          <Grid container sx={{ width: "100%", px: 1 }}>
            <Typography variant="h6" sx={{ pb: 2 }}>
              Sección para el Director de Logística
            </Typography>
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={12}>
              <FormField
                type="text"
                label={"Comentario"}
                name={"commentByDirector"}
                multiline={true}
                value={commentByDirector}
                onChange={(event) => setCommentByDirector(event.target.value)}
                error={!!errors["commentByDirector"]}
                helperText={getHelperText("commentByDirector")}
                inputProps={register("commentByDirector")}
              />
            </Grid>
          </Grid>
        )}
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

TransportRequestForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isDirector: PropTypes.bool,
  existingRequest: PropTypes.object,
  onCancelClick: PropTypes.func,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  closeDialogs: PropTypes.func,
};

TransportRequestForm.defaultProps = {
  isCreate: false,
  isUpdate: false,
  isDirector: false,
  showAlert: false,
  existingRequest: null,
};

export default TransportRequestForm;
