import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useAxiosPrivate from "hooks/useAxiosPrivate.js";
import { variables } from "variables";
import { getActualDate, getActualTime } from "helpers/dateHelper";
import ClockInForm from "components/forms/ClockInForm";

const ClockInDialog = ({ open, setOpen, onCancelClick }) => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCreatedAlert, setShowCreatedAlert] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const createClockIn = async (values) => {
    try {
      await axiosPrivate
        .post(
          variables.CLOCKING_URL,
          JSON.stringify({
            IDVolunteer: values.idVolunteer,
            Date: getActualDate(),
            ClockInTime: getActualTime(),
          })
        )
        .then(() => {
          setShowCreatedAlert(true);
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
    setOpen(false);
    onCancelClick();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogActions sx={{ pt: 2, pr: 3, pb: 0 }}>
        <IconButton aria-label="Cerrar" onClick={closeDialogs}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ p: 3 }}>
        <ClockInForm
          showErrorAlert={showErrorAlert}
          showCreatedAlert={showCreatedAlert}
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
          onCreateSubmitFunction={createClockIn}
        />
      </DialogContent>
    </Dialog>
  );
};

ClockInDialog.propTypes = {
  isCreate: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
};

ClockInDialog.defaultProps = {
  isCreate: false,
  open: false,
};

export default ClockInDialog;
