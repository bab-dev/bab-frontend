import React from "react";
import PropTypes from "prop-types";

import {
  Alert,
  Dialog,
  DialogActions,
  IconButton,
  Grid,
  DialogContent,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import StyledButton from "./Button";

const FormActions = ({
  isLastStep,
  isCreate,
  isUpdate,
  isSignUp,
  isRemovable,
  showErrorAlert,
  handleShowErrorAlert,
  showCreatedAlert,
  handleShowCreatedAlert,
  showUpdatedAlert,
  handleShowUpdatedAlert,
  onClickonCancelClick,
  onClickSubmit,
  onUpdateClickSubmit,
}) => {
  return (
    <Grid container>
      <Dialog
        open={showErrorAlert ? showErrorAlert : false}
        onClose={handleShowErrorAlert}
      >
        <DialogActions sx={{ p: 2 }}>
          <IconButton aria-label="Cerrar" onClick={handleShowErrorAlert}>
            <HighlightOffIcon />
          </IconButton>
        </DialogActions>
        <DialogContent sx={{ p: 2, pt: 0 }}>
          <Alert severity="error">Hubo un error!</Alert>
        </DialogContent>
      </Dialog>
      <Grid container pt={2} display={"flex"} justifyContent={"flex-end"}>
        {isCreate && !isRemovable && (
          <Grid item xxs={12} xs={12} sm={6} md={4} lg={4} sx={{ p: 1 }}>
            <StyledButton
              id="onCancelClicklButton"
              variant="outlined"
              onClick={onClickonCancelClick}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {isSignUp ? "CANCELAR" : "ATRÁS"}
            </StyledButton>
          </Grid>
        )}
        {isRemovable && (
          <Grid item xxs={12} xs={12} sm={6} md={3} lg={3} sx={{ p: 1 }}>
            <StyledButton
              id="removeButton"
              variant="outlined"
              onClick={onClickonCancelClick}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {"ELIMINAR"}
            </StyledButton>
          </Grid>
        )}

        {isCreate && !isRemovable && (
          <Grid item xxs={12} xs={12} sm={6} md={4} lg={4} sx={{ p: 1 }}>
            <StyledButton
              variant="contained"
              type="submit"
              onClick={onClickSubmit}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {isLastStep ? "CREAR" : "SIGUIENTE"}
            </StyledButton>
          </Grid>
        )}
        {isUpdate && (
          <Grid item xxs={12} xs={12} sm={6} md={4} lg={4} xl={6} sx={{ p: 1 }}>
            <StyledButton
              variant="contained"
              type="submit"
              onClick={onUpdateClickSubmit}
              mb={{ xxs: 1, xs: 1, sm: 2 }}
              sx={{ mt: 2 }}
            >
              {"ACTUALIZAR"}
            </StyledButton>{" "}
          </Grid>
        )}
        <Dialog
          open={showCreatedAlert ? showCreatedAlert : false}
          onClose={handleShowCreatedAlert}
        >
          <DialogActions sx={{ p: 2 }}>
            <IconButton aria-label="Cerrar" onClick={handleShowCreatedAlert}>
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
          <DialogContent sx={{ p: 2, pt: 0 }}>
            <Alert severity="success">Se ha registrado correctamente!</Alert>
          </DialogContent>
        </Dialog>
        <Dialog
          open={showUpdatedAlert ? showUpdatedAlert : false}
          onClose={handleShowUpdatedAlert}
        >
          <DialogActions sx={{ p: 2, pb: 1 }}>
            <IconButton aria-label="Cerrar" onClick={handleShowUpdatedAlert}>
              <HighlightOffIcon />
            </IconButton>
          </DialogActions>
          <DialogContent sx={{ p: 2, pt: 0 }}>
            <Alert severity="success">Se ha actualizado correctamente!</Alert>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

FormActions.propTypes = {
  isLastStep: PropTypes.any,
  isCreate: PropTypes.bool,
  isSignUp: PropTypes.bool,
  isUpdate: PropTypes.bool,
  isRemovable: PropTypes.bool,
  showErrorAlert: PropTypes.bool,
  showCreatedAlert: PropTypes.bool,
  showUpdatedAlert: PropTypes.bool,
  handleShowErrorAlert: PropTypes.func,
  handleShowCreatedAlert: PropTypes.func,
  handleShowUpdatedAlert: PropTypes.func,
  onClickonCancelClick: PropTypes.func,
  onClickSubmit: PropTypes.func,
  onUpdateClickSubmit: PropTypes.func,
  onDeleteClickSubmit: PropTypes.func,
};

FormActions.defaultProps = {
  isSignUp: false,
  isCreate: false,
  isUpdate: false,
  isRemovable: false,
  showErrorAlert: false,
  showCreatedAlert: false,
  showUpdatedAlert: false,
};

export default FormActions;
