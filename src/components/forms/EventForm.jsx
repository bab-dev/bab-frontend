import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Grid, MenuItem } from "@mui/material";
import FormField from "components/FormField";
import FormActions from "components/FormActions";

import PropTypes from "prop-types";

import { getActualDateTime, parseDateTime } from "helpers/dateHelper.js";
import EventValidationSchema from "validationSchemas/eventValidationSchema";
import { eventVariables } from "variables/eventVariables";

const EventForm = ({
  creationArg,
  selectedEvent,
  isCreate,
  isUpdate,
  showErrorAlert,
  showCreatedAlert,
  showUpdatedAlert,
  onCancelClick,
  closeDialogs,
  onCreateSubmitFunction,
  onUpdateSubmitFunction,
}) => {
  const state = useSelector((state) => state);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.Title : "");
  const [idDepartment, setIdDepartment] = useState(
    selectedEvent ? selectedEvent.IDDepartment : ""
  );
  const [eventDescription, setEventDescription] = useState(
    selectedEvent ? selectedEvent.EventDescription : ""
  );
  const [eventType, setEventType] = useState(
    selectedEvent ? selectedEvent.EventTypeValue : 0
  );
  const [start, setStartDate] = useState(
    selectedEvent
      ? selectedEvent.StartDateTime
      : creationArg
      ? parseDateTime(creationArg.start)
      : getActualDateTime()
  );
  const [end, setEndDate] = useState(
    selectedEvent
      ? selectedEvent.EndDateTime
      : creationArg
      ? parseDateTime(creationArg.end)
      : getActualDateTime()
  );
  const [observations, setObservations] = useState(
    selectedEvent ? selectedEvent.Observations : " "
  );
  const [numberOfVolunteersRequired, setNumberOfVolunteersRequired] = useState(
    selectedEvent ? selectedEvent.NumberOfVolunteersRequired : 1
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EventValidationSchema),
    defaultValues: {
      title,
      idDepartment,
      eventDescription,
      eventType,
      start,
      end,
      observations,
      numberOfVolunteersRequired,
    },
  });

  const getHelperText = (prop) => {
    return errors[prop] ? errors[prop].message : "";
  };

  return (
    <Box>
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
            label={"Título"}
            name={"title"}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={!!errors["title"]}
            helperText={getHelperText("title")}
            inputProps={register("title")}
          />
        </Grid>
        <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ px: 1 }}>
          <FormField
            required={true}
            type="text"
            label={"Descripción"}
            name={"eventDescription"}
            multiline={true}
            value={eventDescription}
            onChange={(event) => setEventDescription(event.target.value)}
            error={!!errors["eventDescription"]}
            helperText={getHelperText("eventDescription")}
            inputProps={register("eventDescription")}
          />
        </Grid>
        <Grid
          container
          item
          sx={{ width: "100%" }}
          display={"flex"}
          direction={"row"}
        >
          <Grid item xxs={12} xs={12} sm={12} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              select={true}
              label={"Departamento"}
              name={"idDepartment"}
              value={idDepartment}
              onChange={(event) => setIdDepartment(event.target.value)}
              error={!!errors["idDepartment"]}
              helperText={getHelperText("idDepartment")}
              inputProps={register("idDepartment")}
            >
              {state.department.departments.map((department) => (
                <MenuItem key={department.DepartmentName} value={department.Id}>
                  {department.DepartmentName}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              select={true}
              label={"Tipo de Evento"}
              name={"eventTypeValue"}
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
              error={!!errors["eventType"]}
              helperText={getHelperText("eventType")}
              inputProps={register("eventType")}
            >
              {eventVariables.EVENT_TYPE.map((type) => (
                <MenuItem key={type.name} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
        </Grid>
        <Grid
          container
          item
          sx={{ width: "100%" }}
          display={"flex"}
          direction={"row"}
        >
          <Grid item xxs={12} xs={12} sm={12} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              type="datetime-local"
              label={"Fecha Inicio"}
              name={"start"}
              value={start}
              onChange={(event) =>
                setStartDate(parseDateTime(event.target.value))
              }
              error={!!errors["start"]}
              helperText={getHelperText("start")}
              inputProps={register("start")}
            />
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={6} lg={6} sx={{ px: 1 }}>
            <FormField
              required={true}
              type="datetime-local"
              label={"Fecha Fin"}
              name={"end"}
              value={end}
              onChange={(event) =>
                setEndDate(parseDateTime(event.target.value))
              }
              error={!!errors["end"]}
              helperText={getHelperText("end")}
              inputProps={register("end")}
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
        <Grid item xxs={12} xs={12} sm={12} md={6} lg={6} sx={{ px: 1 }}>
          <FormField
            type="number"
            label={"Número de Voluntarios"}
            name={"numberOfVolunteersRequired"}
            value={numberOfVolunteersRequired}
            onChange={(event) =>
              setNumberOfVolunteersRequired(event.target.value)
            }
            error={!!errors["numberOfVolunteersRequired"]}
            helperText={getHelperText("numberOfVolunteersRequired")}
            inputProps={register("numberOfVolunteersRequired")}
          />
        </Grid>
      </Grid>

      <FormActions
        isCreate={isCreate}
        isUpdate={isUpdate}
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

EventForm.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  creationArg: PropTypes.any,
  existingCompany: PropTypes.object,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  onCreateSubmitFunction: PropTypes.func,
  onUpdateSubmitFunction: PropTypes.func,
  closeDialogs: PropTypes.func,
};

FormActions.defaultProps = {
  isCreate: false,
  isUpdate: false,
  showAlert: false,
};
export default EventForm;
