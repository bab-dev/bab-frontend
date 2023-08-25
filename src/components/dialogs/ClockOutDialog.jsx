import React from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClockOutForm from "components/forms/ClockOutForm";

const ClockOutDialog = ({ open, setOpen, onCancelClick }) => {
  const closeDialogs = () => {
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
        <ClockOutForm
          onCancelClick={closeDialogs}
          closeDialogs={closeDialogs}
        />
      </DialogContent>
    </Dialog>
  );
};

ClockOutDialog.propTypes = {
  isCreate: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
};

ClockOutDialog.defaultProps = {
  isCreate: false,
  open: false,
};

export default ClockOutDialog;
