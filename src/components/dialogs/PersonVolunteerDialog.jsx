import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import PersonVolunteerForm from "components/forms/PersonVolunteerForm";
import ConfirmDialog from "./ConfirmDialog";
import { deleteNewPersonVolunteerData } from "actions/newPersonVolunteerActions";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables.js";
import theme from "theme";
import { deleteSelectedPersonVolunteerData } from "actions/selectedPersonVolunteerActions";

const PersonVolunteerDialog = ({
  isCreate,
  isUpdate,
  isSignUp,
  existingPersonVolunteer,
  open,
  setOpen,
  getVolunteers,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
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

  const deletePersonVolunteer = async () => {
    try {
      await axiosPrivate
        .delete(
          `${variables.PERSON_VOLUNTEER_URL}/${existingPersonVolunteer.selectedPerson.Id}`
        )
        .then(() => {
          dispatch(deleteSelectedPersonVolunteerData());
          getVolunteers();
          navigate(`/${variables.VOLUNTEER_URL}`);
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
    setShowErrorAlert(false);
    setShowCreatedAlert(false);
    setShowUpdatedAlert(false);
    setOpen(false);
    dispatch(deleteNewPersonVolunteerData());
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"lg"}>
      <DialogActions sx={{ p: 3, pb: 1 }}>
        <IconButton aria-label="Más opciones" onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          sx={{ ml: 8, mt: 4 }}
          id="menu-modify-volunteer"
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
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>

      <DialogContent sx={{ p: 4 }}>
        <PersonVolunteerForm
          isCreate={isCreate}
          isSignUp={isSignUp}
          isUpdate={isUpdate}
          existingPersonVolunteer={existingPersonVolunteer}
          setOpen={setOpen}
          showErrorAlert={showErrorAlert}
          setShowErrorAlert={setShowErrorAlert}
          showCreatedAlert={showCreatedAlert}
          setShowCreatedAlert={setShowCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          setShowUpdatedAlert={setShowUpdatedAlert}
          getVolunteers={getVolunteers}
        />
      </DialogContent>
      {isUpdate && (
        <ConfirmDialog
          title="Eliminar Voluntario"
          open={openConfirmDialog}
          setOpen={setOpenConfirmDialog}
          onConfirm={deletePersonVolunteer}
          successMessage={"Se ha eliminado correctamente!"}
          onClose={closeDialogs}
        >
          ¿Está seguro de que quiere eliminar este voluntario?
        </ConfirmDialog>
      )}
    </Dialog>
  );
};

PersonVolunteerDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  existingPersonVolunteer: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getVolunteers: PropTypes.func,
};

PersonVolunteerDialog.defaultProps = {
  isSignUp: false,
  isCreate: false,
  isUpdate: false,
  open: false,
};
export default PersonVolunteerDialog;
