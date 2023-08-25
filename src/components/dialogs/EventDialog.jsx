import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import theme from "theme";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../../variables.js";

import EventForm from "components/forms/EventForm";
import { parseDateTime } from "helpers/dateHelper.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

const EventDialog = ({
  isCreate,
  isUpdate,
  creationArg,
  selectedEvent,
  open,
  setOpen,
  onCancelClick,
  getAllEvents,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const createEvent = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.EVENT_URL,
          JSON.stringify({
            title: values.title,
            eventDescription: values.eventDescription,
            eventType: values.eventType,
            idDepartment: values.idDepartment,
            start: parseDateTime(values.start),
            end: parseDateTime(values.end),
            observations: values.observations,
            numberOfVolunteersRequired: values.numberOfVolunteersRequired,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getAllEvents();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            setShowErrorAlert(true);
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const updateEvent = async (values) => {
    if (selectedEvent) {
      await axiosPrivate
        .put(
          `${variables.EVENT_URL}/${selectedEvent.Id}`,
          JSON.stringify({
            title: values.title,
            eventDescription: values.eventDescription,
            eventType: values.eventType,
            idDepartment: values.idDepartment,
            start: parseDateTime(values.start),
            end: parseDateTime(values.end),
            observations: values.observations,
            numberOfVolunteersRequired: values.numberOfVolunteersRequired,
            numberOfVolunteersAssigned:
              selectedEvent.NumberOfVolunteersAssigned,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getAllEvents();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            throw Error(`HTTP error: ${status}`);
          }
        });
    }
  };

  const deletePersonVolunteer = async () => {
    try {
      await axiosPrivate
        .delete(`${variables.EVENT_URL}/${selectedEvent.Id}`)
        .then(() => {
          getAllEvents();
        })
        .catch((err) => {
          if (err.response) {
            const { status } = err.response;
            setShowErrorAlert(true);
            throw Error(`HTTP error: ${status}`);
          }
        });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const closeDialogs = () => {
    setOpenConfirmDialog(false);
    setOpenMenu(false);
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialogs}
      fullScreen={fullScreen}
      m={{ xxs: 2, xs: 4, sm: 6, md: 8, lg: 8 }}
    >
      <DialogActions sx={{ pt: 2, pr: 2, pb: 0 }}>
        {isUpdate && (
          <IconButton aria-label="Más opciones" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          sx={{ ml: 8, mt: 4 }}
          id="menu-modify-event"
          elevation={3}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          <MenuItem
            key="delete"
            onClick={() => setOpenConfirmDialog(true)}
            sx={{
              ":hover": {
                bgcolor: `${theme.palette.secondary.light}`,
                borderRadius: "0.7rem",
              },
              mx: 1,
              display: "flex",
            }}
          >
            <DeleteIcon size="medium" sx={{ mr: 1 }} />
            <Typography textAlign="center">Eliminar</Typography>
          </MenuItem>
        </Menu>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle mx={2}>
        {isCreate ? "Crear Evento" : "Editar Evento"}
      </DialogTitle>
      <DialogContent>
        <EventForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          creationArg={creationArg}
          selectedEvent={selectedEvent}
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          onCancelClick={onCancelClick}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createEvent}
          onUpdateSubmitFunction={updateEvent}
        />
      </DialogContent>
      {isUpdate && (
        <ConfirmDialog
          title="Eliminar Evento"
          open={openConfirmDialog}
          setOpen={setOpenConfirmDialog}
          onConfirm={deletePersonVolunteer}
          successMessage={"Se ha eliminado correctamente!"}
          onClose={closeDialogs}
        >
          ¿Está seguro de que quiere eliminar este evento?
        </ConfirmDialog>
      )}
    </Dialog>
  );
};

EventDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  creationArg: PropTypes.any,
  selectedEvent: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
  getAllEvents: PropTypes.func,
};

export default EventDialog;
