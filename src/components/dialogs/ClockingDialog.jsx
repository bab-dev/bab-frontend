import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Grid,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StyledButton from "components/Button";
import ClockInDialog from "./ClockInDialog";
import ClockOutDialog from "./ClockOutDialog";

const ClockingDialog = ({ open, setOpen }) => {
  const [openClockInDialog, setOpenClockInDialog] = useState(false);
  const [openClockOutDialog, setOpenClockOutDialog] = useState(false);

  const closeDialogs = () => {
    setOpenClockInDialog(false);
    setOpenClockOutDialog(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <DialogActions sx={{ p: { xxs: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={() => setOpen(false)}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogContent sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          display="flex"
          justifyContent={"space-around"}
        >
          <Grid
            item
            width={"100%"}
            xxs={12}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ my: 2 }}
          >
            <StyledButton
              id="clockIn"
              variant="contained"
              onClick={() => setOpenClockInDialog(true)}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {"INGRESO"}
            </StyledButton>
          </Grid>
          <Grid item xxs={12} xs={12} sm={12} md={12} lg={12} sx={{ my: 2 }}>
            <StyledButton
              id="clockOut"
              variant="contained"
              onClick={() => setOpenClockOutDialog(true)}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {"SALIDA"}
            </StyledButton>
          </Grid>
        </Grid>
        <ClockInDialog
          open={openClockInDialog}
          setOpen={setOpenClockInDialog}
          onCancelClick={closeDialogs}
        />
        <ClockOutDialog
          open={openClockOutDialog}
          setOpen={setOpenClockOutDialog}
          onCancelClick={closeDialogs}
        />
      </DialogContent>
    </Dialog>
  );
};

ClockingDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onCancelClick: PropTypes.func,
};

ClockingDialog.defaultProps = {
  isCreate: false,
  open: false,
};

export default ClockingDialog;
