import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import StyledButton from "components/Button";

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm, onClose, successMessage } =
    props;
  const [openSucessAlert, setOpenSucessAlert] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <IconButton aria-label="Cerrar" onClick={onClose}>
          <HighlightOffIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle
        id="confirm-dialog"
        fontWeight={"bold"}
        sx={{ mx: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ mx: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ p: { xxs: 2, xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
        <Grid
          container
          display={"flex"}
          justifyContent={"flex-end"}
          direction={{
            xxs: "column-reverse",
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
            xl: "row",
          }}
        >
          <Grid item xxs={12} xs={12} sm={6} md={4} lg={4} sx={{ p: 1 }}>
            <StyledButton
              variant="outlined"
              type="submit"
              onClick={() => setOpen(false)}
            >
              {"NO"}
            </StyledButton>
          </Grid>
          <Grid item xxs={12} xs={12} sm={6} md={4} lg={4} sx={{ p: 1 }}>
            <StyledButton
              variant="contained"
              type="submit"
              onClick={() => {
                onConfirm();
                setOpenSucessAlert(true);
              }}
            >
              {"SI"}
            </StyledButton>
          </Grid>
        </Grid>
      </DialogActions>
      <Dialog open={openSucessAlert} onClose={() => setOpenSucessAlert(false)}>
        <DialogActions sx={{ p: 2, pb: 1 }}>
          <IconButton
            aria-label="Cerrar"
            onClick={() => {
              setOpenSucessAlert(false);
              onClose();
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </DialogActions>
        <DialogContent sx={{ p: 2, pt: 0 }}>
          <Alert severity="success">{successMessage}</Alert>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  props: PropTypes.any,
};
export default ConfirmDialog;
