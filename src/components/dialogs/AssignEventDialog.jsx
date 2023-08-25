import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DetailsIcon from "@mui/icons-material/Details";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import theme from "theme";
import StyledButton from "components/Button";
import { formatDateTime } from "helpers/dateHelper";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../../variables.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

const AssignEventDialog = ({
  selectedEvent,
  open,
  setOpen,
  getAllEvents,
  getEventsByIdVolunteer,
}) => {
  const state = useSelector((state) => state);
  const axiosPrivate = useAxiosPrivate();
  const [openConfirmAssignDialog, setOpenConfirmAssignDialog] = useState(false);
  const [openConfirmUnassignDialog, setOpenConfirmUnassignDialog] =
    useState(false);

  const verifyIfAssigned = (volunteerEvents) => {
    var assignedEvent = volunteerEvents.find((e) => e.Id == selectedEvent.Id);
    return assignedEvent != null;
  };

  const isAssigned = verifyIfAssigned(state.events.volunteerEvents);

  const assignVolunteerToEvent = async () => {
    try {
      await axiosPrivate
        .post(
          variables.EVENT_VOLUNTEER_URL,
          JSON.stringify({
            idEvent: selectedEvent ? selectedEvent.Id : "",
            idVolunteer: state.user.userData.Volunteer.Id,
          })
        )
        .then(() => {
          getAllEvents();
          getEventsByIdVolunteer();
          closeDialogs();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const unassignVolunteerFromEvent = async () => {
    try {
      await axiosPrivate
        .delete(
          `${variables.EVENT_VOLUNTEER_URL}/${state.user.userData.Volunteer.Id}/${variables.EVENT_URL}/${selectedEvent.Id}`
        )
        .then(() => {
          getAllEvents();
          getEventsByIdVolunteer();
          closeDialogs();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const closeDialogs = () => {
    setOpen(false);
    setOpenConfirmAssignDialog(false);
    setOpenConfirmUnassignDialog(false);
  };

  const getAvailableSpaces = () => {
    return (
      parseInt(selectedEvent.NumberOfVolunteersRequired) -
      parseInt(selectedEvent.NumberOfVolunteersAssigned)
    );
  };
  return (
    <Dialog
      open={open}
      onClose={closeDialogs}
      m={{ xxs: 2, xs: 4, sm: 6, md: 8, lg: 8 }}
    >
      <DialogActions sx={{ pt: 2, pr: 2, pb: 0 }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle
        mx={2}
        sx={{
          fontWeight: "bold",
        }}
      >
        {selectedEvent ? selectedEvent.Title : ""}
      </DialogTitle>
      <DialogContent>
        <Box mr={{ xxs: 2, xs: 2, sm: 2 }}>
          <Grid
            container
            sx={{ mx: 2, mb: 2 }}
            direction={"column"}
            display={"flex"}
            width={"100%"}
          >
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} mb={0.5}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                width="100%"
                display={"flex"}
                sx={{
                  overflow: "hidden",
                }}
              >
                <AccessTimeIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: theme.spacing(1),
                  }}
                />
                {selectedEvent
                  ? formatDateTime(selectedEvent.StartDateTime)
                  : ""}{" "}
                -{" "}
                {selectedEvent ? formatDateTime(selectedEvent.EndDateTime) : ""}
              </Typography>
            </Grid>
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={6} mb={0.5}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                width="100%"
                display={"flex"}
                sx={{
                  overflow: "hidden ",
                }}
              >
                <InfoOutlinedIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: theme.spacing(1),
                  }}
                />
                {selectedEvent ? selectedEvent.EventDescription : ""}
              </Typography>
            </Grid>
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} mb={0.5}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                width="100%"
                display={"flex"}
                sx={{
                  overflow: "hidden",
                }}
              >
                <DetailsIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: theme.spacing(1),
                  }}
                />
                {selectedEvent.Observations
                  ? selectedEvent.Observations
                  : "Ninguna observación"}
              </Typography>
            </Grid>
            <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} mb={0.5}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                width="100%"
                display={"flex"}
                sx={{
                  overflow: "hidden",
                }}
              >
                <GroupOutlinedIcon
                  style={{
                    verticalAlign: "middle",
                    marginRight: theme.spacing(1),
                  }}
                />
                {selectedEvent ? getAvailableSpaces() : 1} cupos disponibles
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid
          container
          width={"100%"}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <Grid
            item
            xxs={12}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            mb={{ xxs: 1, xs: 1, sm: 2 }}
            sx={{ mt: 1 }}
          >
            {" "}
            <StyledButton
              id="assignButton"
              variant="contained"
              disabled={getAvailableSpaces() <= 0 && !isAssigned ? true : false}
              onClick={
                isAssigned
                  ? () => setOpenConfirmUnassignDialog(true)
                  : () => setOpenConfirmAssignDialog(true)
              }
            >
              {!isAssigned ? "ASIGNARME" : "DESASIGNARME"}
            </StyledButton>
          </Grid>
        </Grid>
      </DialogContent>{" "}
      {!isAssigned && (
        <ConfirmDialog
          title="Asignar Voluntario"
          open={openConfirmAssignDialog}
          setOpen={setOpenConfirmAssignDialog}
          onConfirm={assignVolunteerToEvent}
          successMessage={"Se ha asignado al evento correctamente!"}
          onClose={closeDialogs}
        >
          ¿Está seguro que desea asignar a este usuario a este evento?
        </ConfirmDialog>
      )}
      {isAssigned && (
        <ConfirmDialog
          title="Desasignar Voluntario"
          open={openConfirmUnassignDialog}
          setOpen={setOpenConfirmUnassignDialog}
          onConfirm={unassignVolunteerFromEvent}
          successMessage={"Se ha desasignado del evento correctamente!"}
          onClose={closeDialogs}
        >
          ¿Está seguro que desea desasignar a este usuario de este evento?
        </ConfirmDialog>
      )}
    </Dialog>
  );
};

AssignEventDialog.propTypes = {
  selectedEvent: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getAllEvents: PropTypes.func,
  getEventsByIdVolunteer: PropTypes.func,
};

export default AssignEventDialog;
