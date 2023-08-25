import { React, useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import TripForm from "components/forms/TripForm.jsx";

import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "../../variables.js";
import { parseDate } from "helpers/dateHelper.js";

const TripDialog = ({
  isCreate,
  isUpdate,
  existingTrip,
  open,
  setOpen,
  onCancelClick,
  getTrips,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);
  const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);

  const createTrip = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.TRIP_URL,
          JSON.stringify({
            idCoordinator: values.idCoordinator,
            idDepartment: values.idDepartment,
            vehicule: values.vehicule,
            date: parseDate(values.date),
            numOfPassengers: values.numOfPassengers,
            transportType: values.transportType,
            departureType: values.departureType,
            departureIDPlace: values.departureIDPlace,
            departureTime: values.departureTime.toString(),
            initialKm: values.initialKm,
            arrivalType: values.arrivalType,
            arrivalIDPlace: values.arrivalIDPlace,
            arrivalTime: values.arrivalTime.toString(),
            finalKm: values.finalKm,
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
          getTrips();
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

  const updateTrip = async (values) => {
    try {
      await axiosPrivate
        .put(
          `${variables.TRIP_URL}/${existingTrip.Id}`,
          JSON.stringify({
            idCoordinator: values.idCoordinator,
            idDepartment: values.idDepartment,
            vehicule: values.vehicule,
            date: parseDate(values.date),
            numOfPassengers: values.numOfPassengers,
            transportType: values.transportType,
            departureType: values.departureType,
            departureIDPlace: values.departureIDPlace,
            departureTime: values.departureTime.toString(),
            initialKm: values.initialKm,
            arrivalType: values.arrivalType,
            arrivalIDPlace: values.arrivalIDPlace,
            arrivalTime: values.arrivalTime.toString(),
            finalKm: values.finalKm,
          })
        )
        .then(() => {
          setShowUpdatedAlert(true);
          getTrips();
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
    onCancelClick();
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"lg"}>
      <DialogActions sx={{ pt: 2, pr: 3, pb: 0 }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: 3 }}>
        <TripForm
          isCreate={isCreate}
          isUpdate={isUpdate}
          existingTrip={existingTrip}
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          showUpdatedAlert={showUpdatedAlert}
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createTrip}
          onUpdateSubmitFunction={updateTrip}
        />
      </DialogContent>
    </Dialog>
  );
};

TripDialog.propTypes = {
  isCreate: PropTypes.bool,
  isUpdate: PropTypes.bool,
  existingTrip: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
  getTrips: PropTypes.func,
};

export default TripDialog;
